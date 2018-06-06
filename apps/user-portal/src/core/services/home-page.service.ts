import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { OpenStreetMapApiService } from './open-streetmap-api.service'

@Injectable()
export class HomePageService {

  constructor(private api: OpenStreetMapApiService){

  }

  public doA(a:string){
    this.api.doOpenStreetMapApiCall(a);
    console.log(`HomePageService: ${a}`);
  }

  public getOpenStreetMapApiData$(inputAddressSearch$:Observable<string>):Observable<any>{
    return this.api.getOpenStreetMapApiData$(inputAddressSearch$)
  }

}
