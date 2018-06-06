import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { OpenStreetMapApiService } from './open-streetmap-api.service'
//models
// import { MeventI }                  from '../models/mevent';
// import { FeventI }                  from '../models/fevent';

@Injectable()
export class HomePageService {


//   private mevents$:Observable<Array<MeventI>>;
//   private mevents:MeventI[];

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
