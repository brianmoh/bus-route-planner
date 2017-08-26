import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrpMap } from './components/brp-map';
import { MapService } from './services/map-service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [
        BrpMap
    ],
    exports: [
        BrpMap
    ],
    providers: [
        MapService
    ]
})
export class MapModule { }
