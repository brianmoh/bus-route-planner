import { Component } from '@angular/core';
import { MapService } from '../services/map-service';
import { Geometry } from '../models/geometry';
import { POI } from '../models/poi';

@Component({
  selector: 'brp-map',
  templateUrl: '/app/map/templates/brp-map.html'
})

export class BrpMap {
  map: any;
  busIcon: any;
  riderIcon: any;
  busStops: Array<Geometry>;
  pois: Array<POI> = new Array<POI>();
  riders: Array<POI> = new Array<POI>();

  constructor(private mapService: MapService) {
    this.busIcon = L.icon({
      iconUrl: '../../img/bus-stop-icon.png',
      iconSize: [41, 41]
    });
    this.riderIcon = L.icon({
      iconUrl: '../../img/rider-icon.png',
      iconSize: [41, 41]
    });
  }

  ngAfterViewInit() {
    this.map = L.map('map').setView([37.444856, -122.159447], 17);
    let mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
      }).addTo(this.map);

    this.mapService.getRideLocations().subscribe((pois: Array<POI>) => {
      for (let poi of pois) {
        if (poi.type.toLowerCase() === 'poi') {
          this.pois.push(poi);
          L.marker(poi.geometry.coordinates).addTo(this.map);
        } else if (poi.type.toLowerCase() === 'rider') {
          this.riders.push(poi);
          L.marker(poi.geometry.coordinates, {
            icon: this.riderIcon
          }).addTo(this.map);
        }
      }
    });

    this.mapService.getBusStopLocations().subscribe((busStops: Array<Geometry>) => {
      for (let busStop of busStops) {
        L.marker(busStop.coordinates, {
          icon: this.busIcon,
          draggable: true
        }).on('dragend', (event) => {
          console.log(event);
        }).addTo(this.map);
      }
    });
  }
}
