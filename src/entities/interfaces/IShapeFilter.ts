import { IShape } from "./IShape";

export interface IShapeFilter {
    getByQuadrant(shapes: IShape[], quadrant: number): IShape[];
    getByAreaRange(shapes: IShape[], minArea: number, maxArea: number): IShape[];
    getByVolumeRange(shapes: IShape[], minVolume: number, maxVolume: number): IShape[];
    getByPerimeterRange(shapes: IShape[], minPerimeter: number, maxPerimeter: number): IShape[];
    getByDistanceRange(shapes: IShape[], minDistance: number, maxDistance: number): IShape[];
} 