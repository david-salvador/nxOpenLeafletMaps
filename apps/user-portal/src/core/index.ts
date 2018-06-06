/*
Service modules provide utility services such as data access and messaging.
Ideally, they consist entirely of providers and have no declarations.
Angular's HttpClientModule is a good example of a service module.

The root AppModule is the only module that should import service modules.
*/

import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { HomePageService } from "./services/home-page.service";
import { OpenStreetMapApiService } from "./services/open-streetmap-api.service";

@NgModule({
    //declarations: [], //...and have no declarations.
    imports: [
        HttpClientModule
    ],
    providers: [
        HomePageService,
        OpenStreetMapApiService,      
    ],
})
export class CoreModule { }

export { HomePageService } from './services/home-page.service';