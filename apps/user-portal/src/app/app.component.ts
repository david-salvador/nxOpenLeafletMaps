import {
  AfterContentInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { Place } from '../shared';
import { HomePageService } from "../core";

import { Observable } from 'rxjs/Observable';
import { tap, map, catchError, filter } from 'rxjs/operators';
import 'rxjs/add/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';

import * as L from 'leaflet';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'ia-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit{
  title = 'ia';

  @ViewChild('addressInput') private textInputElement: ElementRef;

  private mymap;
  private inputAddressSearch$: Observable<string>;
  private openStreetMapApiData$: Observable<Place[]>;

  private options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         maxZoom: 18,
         attribution: 'dsalvador'
        })
    ],
    zoom: 5,
    center: L.latLng(41.000000, 0.726909)
  };

  private maxRangeBoundingBox:number[];
  private points:L.Point[] = [];
  private bounds:L.Bounds;

  stackChartMapDataDictionary;
  stackChartMapDataArray;

  constructor( private homePageService: HomePageService ){
  //  this.stackChartMapData1 = [{ id: 'a', duration: 2384 }, { id: 2, duration: 5485 }, { id: 3, duration: 2434 }, { id: 4, duration: 5565 }];
   this.stackChartMapDataDictionary = {};   
  }


  onMapReady(lMap: L.Map) {
    this.mymap = lMap;        
  }

  ngAfterContentInit(){

    this.inputAddressSearch$ = Observable.fromEvent(this.textInputElement.nativeElement, 'keyup')
    .pipe(
      map((e:any) => e.target.value),
      filter((text:string) => text.length > 2),
      debounceTime(1000),      
      //tap((text:string)=> console.log(` --> ${text}`))
    );

    this.openStreetMapApiData$ = this.homePageService.getOpenStreetMapApiData$(this.inputAddressSearch$);
    this.openStreetMapApiData$
      .subscribe(
        (placesArray:Place[]) => this.updatePageData(placesArray),
        (error:any) => this.handleError(error)
      );
  }

  private updatePageData(places:Place[]){
    //console.log(`MIAPP01 >> ok ${JSON.stringify(places, undefined, 2)} <<`);
    let place:Place;
    let placeLatLon:[number, number];
    //this.mymap.setView(placeLatLon, 13);
   
    for (const p of places){
      placeLatLon = [p.lat, p.lon];

      L.marker(placeLatLon,{
        icon: L.icon({
          iconSize:   [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl:    'assets/images/marker-icon.png',
          shadowUrl:  'assets/images/marker-shadow.png'
       })
      }).addTo(this.mymap);

      // L.popup().setLatLng(placeLatLon).setContent(`${p.name}`).openOn(this.mymap);
    }
    this.updateMapBoundingBox(places);

    this.updateSvgData(places);

  }

  private updateMapBoundingBox(places:Place[]){

    let p1:L.Point;
    let p2:L.Point;
    for (const p of places){
      p1 =  L.point(p.bBox[0],p.bBox[2]);
      p2 =  L.point(p.bBox[1],p.bBox[3]);
      this.points.push(p1);
      this.points.push(p2);
    }
    const bounds = L.bounds(this.points);
    const latLngBounds: L.LatLngBounds = L.latLngBounds(L.latLng(bounds.min['x'],bounds.min['y']),L.latLng(bounds.max['x'],bounds.max['y']));

    this.mymap.fitBounds(latLngBounds, {pan: {animate: true, duration: 1.5, easeLinearity: 0.25}});    
  }


  private updateSvgData(places:Place[]){
    for (const p of places){
      if(this.stackChartMapDataDictionary[p.type]){
        this.stackChartMapDataDictionary[p.type] = this.stackChartMapDataDictionary[p.type] + 1;
      } else {
        this.stackChartMapDataDictionary[p.type] = 1;
      }
    }
    console.log(`updatedSvgData:${JSON.stringify(this.stackChartMapDataDictionary,undefined,2)}`);
    
    //preparing data for stack chart
    let temporaryDataArray=[];
    let iObject:Object;
    for (const key of Object.keys(this.stackChartMapDataDictionary)){
      iObject = {id:key, duration:this.stackChartMapDataDictionary[key]};
      temporaryDataArray.push(iObject);
    }
    this.stackChartMapDataArray = [...temporaryDataArray];//a single update to be detected
  }

  private handleError(error:any){
    console.error(`MIAPP02 >> error ${JSON.stringify(error)}`)
  }
}
