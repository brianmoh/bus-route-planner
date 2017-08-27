import { Geometry } from './geometry';

export interface POI {
    geometry: Geometry;
    properties: {
        name?: string,
        riders?: number,
        age?: number,
        income?: number,
        Wheelchair?: boolean
    }
    type: string;
}
