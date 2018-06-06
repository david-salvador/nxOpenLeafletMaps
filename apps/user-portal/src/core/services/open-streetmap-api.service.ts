import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap, map, catchError, filter, mergeMap } from 'rxjs/operators';

import { Place } from '../../shared';

@Injectable()
export class OpenStreetMapApiService {

  BASE_URL = 'https://nominatim.openstreetmap.org/search';
  constructor(private http: HttpClient){
  }

  public doOpenStreetMapApiCall(parameter:string){
    console.log(`OpenStreetMapApiService: ${parameter}`)
  }

  public getOpenStreetMapApiData$(inputAddressSearch$: Observable<string>): Observable<Place[]> {

    const returnObservable$:Observable<Place[]> = inputAddressSearch$
      .pipe(
        mergeMap((inputAddressSearch:string) => this.http.get<any>(
          `${this.BASE_URL}?q=${inputAddressSearch}&limit=2&format=json`
        )),
              // tap((a: any) => console.log(`httpResp1 --> `, JSON.stringify(a, undefined, 2))),
        filter((arrayOfAny:any[]) => arrayOfAny.length > 0),

        map((arrayOfAny:any[]) =>  arrayOfAny.map( (ai:any) => <Place>{
          id:           <string>    ai['place_id'],
          name:         <string>    ai['display_name'],
          bBox:         <number[]>  ai['boundingbox'],
          lat:          <number>    ai['lat'],
          lon:          <number>    ai['lon'],
          type:         <string>    ai['type']
        })),
              //tap((a: any) => console.log(`httpResp2 --> `, JSON.stringify(a, undefined, 2))),
        catchError((error: any) => Observable.throw(error.json()))
      );

    return returnObservable$;
  }

}