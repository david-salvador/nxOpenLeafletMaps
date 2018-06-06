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
         attribution: '...'
        })
    ],
    zoom: 5,
    center: L.latLng(41.000000, 0.726909)
  };

  private maxRangeBoundingBox:number[];
  private points:L.Point[] = [];
  private bounds:L.Bounds;

  constructor( private homePageService: HomePageService ){

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

  private handleError(error:any){
    console.error(`MIAPP02 >> error ${JSON.stringify(error)}`)
  }
}
