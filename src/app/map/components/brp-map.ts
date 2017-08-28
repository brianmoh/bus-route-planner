import { Component } from '@angular/core';
import { MapService } from '../services/map-service';
import { Geometry } from '../models/geometry';
import { POI } from '../models/poi';
import { LatLngExpression, Marker } from 'leaflet';
import { Subscription } from 'rxjs/Subscription';

const TENTH_OF_MILE = 160.934;

@Component({
  selector: 'brp-map',
  templateUrl: '/app/map/templates/brp-map.html'
})

export class BrpMap {
  private map: any;
  private busIcon: any;
  private riderIcon: any;
  private poiIcon: any;
  private busStopMarkers: Array<Marker> = new Array<Marker>();
  private pois: Array<POI> = new Array<POI>();
  private riders: Array<POI> = new Array<POI>();
  private prevBusStopLatLng: LatLngExpression;
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  isLoading = true;

  constructor(private mapService: MapService) {
    this.busIcon = L.icon({
      iconUrl: '../../img/bus-stop-icon.png',
      shadowUrl: '../../js/lib/leaflet/images/marker-shadow.png',
      iconSize: [41, 41]
    });

    this.riderIcon = L.icon({
      iconUrl: '../../img/rider-icon.png',
      shadowUrl: '../../js/lib/leaflet/images/marker-shadow.png',
      iconSize: [41, 41]
    });

    this.poiIcon = L.icon({
      iconUrl: '../../img/poi-icon.png',
      shadowUrl: '../../js/lib/leaflet/images/marker-shadow.png',
      iconSize: [41, 41]
    });
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.initializeRideMarkers();
    this.initializeBusStopMarkers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([37.444856, -122.159447], 17);
    let mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
      }).addTo(this.map);
  }

  private initializeRideMarkers(): void {
    this.subscriptions.push(
      this.mapService.getRideLocations().finally(() => {
        this.isLoading = false;
      }).subscribe((pois: Array<POI>) => {
        for (let poi of pois) {
          if (poi.type.toLowerCase() === 'poi') {
            this.pois.push(poi);
            L.marker(poi.geometry.coordinates, {
              icon: this.poiIcon,
            }).bindPopup(`
                <b>${poi.type}</b>
                <br>
                Name: ${this.getPopupString(poi.properties.name)}
                <br>
                Average riders: ${this.getPopupString(poi.properties.riders)}
              `).addTo(this.map);
          } else if (poi.type.toLowerCase() === 'rider') {
            this.riders.push(poi);
            L.marker(poi.geometry.coordinates, {
              icon: this.riderIcon
            }).bindPopup(`
                <b>${poi.type}</b>
                <br>
                Age: ${this.getPopupString(poi.properties.age)}
                <br>
                Income: ${this.getPopupString(poi.properties.income)}
                <br>
                Wheelchair Access: ${this.getPopupString(poi.properties.Wheelchair)}
              `).addTo(this.map);
          }
        }
      })
    );
  }

  private initializeBusStopMarkers(): void {
    this.subscriptions.push(
      this.mapService.getBusStopLocations().subscribe((busStops: Array<Geometry>) => {
        for (let busStop of busStops) {
          let marker = L.marker(busStop.coordinates, {
            icon: this.busIcon,
            draggable: true
          })
            .on('dragstart', (event) => {
              this.prevBusStopLatLng = event.target._latlng
            })
            .on('dragend', (event) => {
              if (!this.isValidBusStopLocation(event.target._latlng, marker)) {
                marker.setLatLng(L.latLng(this.prevBusStopLatLng));
                alert('Error: Bus stop marker dragged outside range of a POI.');
              }
              marker.getPopup()
                .setContent(`
                  <b>Bus Stop</b>
                  <br>
                  ${this.distanceToNearestPOI(event.target._latlng, 'POI')}m away from nearest POI.
                  <br>
                  ${this.distanceToNearestPOI(event.target._latlng, 'rider')}m away from nearest rider.
                `);
            }).bindPopup(`
              <b>Bus Stop</b>
              <br>
              ${this.distanceToNearestPOI(busStop.coordinates, 'POI')}m away from nearest POI.
              <br>
              ${this.distanceToNearestPOI(busStop.coordinates, 'rider')}m away from nearest rider.
            `)
            .addTo(this.map);
          this.busStopMarkers.push(marker);
        }
      })
    );
  }

  private isValidBusStopLocation(coordinates: LatLngExpression, marker: Marker): boolean {
    for (let poi of this.pois) {
      // distanceTo returns a number in meters
      if (L.latLng(poi.geometry.coordinates).distanceTo(coordinates) <= TENTH_OF_MILE) {
        // valid bus stop location. check to see if poi is serviced by another bus stop here. then warn.
        if (this.isServicedByAnotherBusStop(poi.geometry.coordinates, marker)) {
          alert('Warning: This POI is already serviced by a bus stop.');
        }
        return true;
      }
    }
    return false;
  }

  private isServicedByAnotherBusStop(coordinates: LatLngExpression, marker: Marker): boolean {
    for (let busStopMarker of this.busStopMarkers) {
      // don't check bus stop to itself
      if (busStopMarker !== marker && L.latLng(coordinates).distanceTo(busStopMarker.getLatLng()) <= TENTH_OF_MILE) {
        return true;
      }
    }
    return false;
  }

  private distanceToNearestPOI(coordinates: LatLngExpression, type: string): string {
    let distance = Number.MAX_VALUE;
    if (type === 'POI') {
      for (let poi of this.pois) {
        let curPoiDistance = L.latLng(poi.geometry.coordinates).distanceTo(coordinates);
        if (curPoiDistance < distance) {
          distance = curPoiDistance
        }
      }
    } else if (type === 'rider') {
      for (let rider of this.riders) {
        let curPoiDistance = L.latLng(rider.geometry.coordinates).distanceTo(coordinates);
        if (curPoiDistance < distance) {
          distance = curPoiDistance
        }
      }
    }
    return distance.toFixed(1);
  }

  private getPopupString(property: any): string {
    if (property == null) {
      return 'Unavailable';
    } else if (typeof property === 'boolean') {
      return property ? 'Yes' : 'No';
    } else {
      return property;
    }
  }

  resetBusStopMarkers(): void {
    for (let marker of this.busStopMarkers) {
      this.map.removeLayer(marker);
    }
    this.busStopMarkers = [];
    this.initializeBusStopMarkers();
  }

  getAverageRiderAge(): string {
    let sum = 0;
    for (let rider of this.riders) {
      if (rider.properties.age != null) {
        sum += rider.properties.age;
      }
    }
    return (sum / this.riders.length).toFixed(0);
  }

  getAverageRiderIncome(): string {
    let sum = 0;
    for (let rider of this.riders) {
      if (rider.properties.income != null) {
        sum += rider.properties.income;
      }
    }
    return (sum / this.riders.length).toFixed(0);
  }
}
