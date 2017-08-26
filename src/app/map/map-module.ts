import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrpMap } from './components/brp-map';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BrpMap
    ],
    exports: [
        BrpMap
    ]
})
export class MapModule { }
