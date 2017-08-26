import { LatLngExpression } from 'leaflet';

export interface Geometry {
    coordinates: LatLngExpression;
    type: string;
}
