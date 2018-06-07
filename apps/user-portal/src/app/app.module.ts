import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

import { IaUiComponents, Place } from '../shared';
import { CoreModule }     from '../core';

import { IaD3Module } from '@ia-npm-scope/common/d3'; 

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    IaUiComponents,
    CoreModule,
    IaD3Module,
    LeafletModule.forRoot(),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
