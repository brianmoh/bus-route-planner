import { Component } from '@angular/core';

@Component({
  selector: 'brp-map',
  templateUrl: '/app/map/templates/brp-map.html'
})

export class BrpMap {
  constructor() { }

  ngAfterViewInit() {
    let map = L.map('map').setView([-41.2858, 174.78682], 14);
    let mapLink =
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
      }).addTo(map);
  }
}
