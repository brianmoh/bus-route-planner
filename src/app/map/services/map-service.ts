import 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geometry } from '../models/geometry';
import { POI } from '../models/poi';

@Injectable()
export class MapService {
    constructor(private http: Http) { }

    getBusStopLocations(): Observable<Array<Geometry>> {
        return this.http.get('../../json/bus-stops-locations.json').map((res: Response) => {
            return res.json().items;
        });
    }

    getRideLocations(): Observable<Array<POI>> {
        /*'https://gfl-busdata.herokuapp.com/paloalto.json?api_key=cd81c144951d82b656ae9b8e78957c'*/
        return this.http.get('../../json/ride-locations.json')
            .map((res: Response) => {
                return res.json().items;
            });
    }
}
