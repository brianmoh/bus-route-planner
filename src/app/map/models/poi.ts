import { Geometry } from './geometry';

export interface POI {
    geometry: Geometry;
    properties: {
        name: string,
        riders: number
    }
    type: string;
}
