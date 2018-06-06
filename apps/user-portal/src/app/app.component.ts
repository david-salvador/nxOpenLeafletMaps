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
//import '../node_modules/leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src.js';
//import * as C from '../../../../node_modules/leafle';


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
         attribution: '...'
        })
    ],
    zoom: 5,
    center: L.latLng(41.000000, 0.726909)
  };

  private layersControl = {
    // baseLayers: {
    //   'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    //   'Open Cycle Map': L.tileLayer('http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    // },
    // overlays: {
    //   'Big Circle': L.circle([ 46.95, -122 ], { radius: 5000 }),
    //   'Big Square': L.polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    // }
  }

  private maxRangeBoundingBox:number[];
  private points:L.Point[] = [];
  private bounds:L.Bounds;

  constructor( private homePageService: HomePageService ){

  }


  onMapReady(lMap: L.Map) {
    //console.log(`onMapReady(${JSON.stringify(map)})`);
    this.mymap = lMap;
    console.log(`onMapReady(map)) ${this.mymap}`);
    //L.control. coordinates({}).addTo(map);
    this.homePageService.doA('fromAppComponent');
  }

  ngAfterContentInit(){

    this.inputAddressSearch$ = Observable.fromEvent(this.textInputElement.nativeElement, 'keyup')
    .pipe(
      map((e:any) => e.target.value),
      filter((text:string) => text.length > 2),
      debounceTime(1000),
        //tap((text:string)=> this.search_text_query.next(text))
      tap((text:string)=> console.log(` --> ${text}`))
    );

    this.openStreetMapApiData$ = this.homePageService.getOpenStreetMapApiData$(this.inputAddressSearch$);
    this.openStreetMapApiData$
      .subscribe(
        (placesArray:Place[]) => this.updatePageData(placesArray),
        (error:any) => this.handleError(error)
      );
  }

  private updatePageData(places:Place[]){
    console.log(`MIAPP01 >> ok ${JSON.stringify(places, undefined, 2)} <<`);
    const place:Place = places[0];
    const placeLatLon:[number, number] = [place.lat, place.lon];
    //this.mymap.setView(placeLatLon, 13);

    //L.marker(placeLatLon).addTo(this.mymap).bindPopup(place.name).openPopup();
    for (const p of places){
      L.popup().setLatLng([p.lat, p.lon])
      .setContent(`${p.name}`)
      .openOn(this.mymap);
    }

    this.updateMapBoundingBox(places);
  }

 
  private updateMapBoundingBox(places:Place[]){

    // if(!this.maxRangeBoundingBox){
    //   this.maxRangeBoundingBox = [0,0,0,0];
    //   this.maxRangeBoundingBox[0] = places[0].bBox[0];
    //   this.maxRangeBoundingBox[1] = places[0].bBox[1];
    //   this.maxRangeBoundingBox[2] = places[0].bBox[2];
    //   this.maxRangeBoundingBox[3] = places[0].bBox[3];
    // }
    // for (const p of places){
    //   this.maxRangeBoundingBox[0] = this.maxRangeBoundingBox[0] < p.bBox[0]?this.maxRangeBoundingBox[0]:p.bBox[0];
    //   this.maxRangeBoundingBox[1] = this.maxRangeBoundingBox[1] > p.bBox[1]?this.maxRangeBoundingBox[1]:p.bBox[1];
    //   this.maxRangeBoundingBox[2] = this.maxRangeBoundingBox[2] < p.bBox[2]?this.maxRangeBoundingBox[2]:p.bBox[2];
    //   this.maxRangeBoundingBox[3] = this.maxRangeBoundingBox[3] > p.bBox[3]?this.maxRangeBoundingBox[3]:p.bBox[3];
    // }

    // console.log(this.maxRangeBoundingBox);

    // const p1 = L.point(this.maxRangeBoundingBox[0],this.maxRangeBoundingBox[2]);
    // const p2 = L.point(this.maxRangeBoundingBox[1],this.maxRangeBoundingBox[3]);
    // const bounds = L.bounds(p1, p2);

    let p1:L.Point; //=
    let p2:L.Point; //= L.point(p.bBox[0],p.bBox[2]);
    for (const p of places){
      p1 =  L.point(p.bBox[0],p.bBox[2]);
      p2 =  L.point(p.bBox[1],p.bBox[3]);
      this.points.push(p1);
      this.points.push(p2);
      // this.maxRangeBoundingBox[0] = this.maxRangeBoundingBox[0] < p.bBox[0]?this.maxRangeBoundingBox[0]:p.bBox[0];
      // this.maxRangeBoundingBox[1] = this.maxRangeBoundingBox[1] > p.bBox[1]?this.maxRangeBoundingBox[1]:p.bBox[1];
      // this.maxRangeBoundingBox[2] = this.maxRangeBoundingBox[2] < p.bBox[2]?this.maxRangeBoundingBox[2]:p.bBox[2];
      // this.maxRangeBoundingBox[3] = this.maxRangeBoundingBox[3] > p.bBox[3]?this.maxRangeBoundingBox[3]:p.bBox[3];
    }
    const bounds = L.bounds(this.points);
    //this.mymap.setView(bounds.getCenter(true), 13);
    this.mymap.setMaxBounds(bounds);
    //this.mymap.fitBounds(this.maxRangeBoundingBox, {pan: {animate: true, duration: 1.5, easeLinearity: 0.25}});
  }

  private handleError(error:any){
    console.error(`MIAPP02 >> error ${JSON.stringify(error)}`)
  }




}



/*


@Output()
public search_text_query: EventEmitter<string> = new EventEmitter<string>();



*/
