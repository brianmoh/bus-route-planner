import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrpMainApp } from './components/brp-main-app';
import { MapModule } from '../map/map-module';

@NgModule({
  imports: [
    BrowserModule,
    MapModule
  ],
  declarations: [
    BrpMainApp
  ],
  bootstrap: [
    BrpMainApp
  ]
})
export class AppModule { }
