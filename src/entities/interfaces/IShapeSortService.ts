import { IShape } from "./IShape";

export interface IShapeSortService {
    sortByName(shapes: IShape[], ascending?: boolean): IShape[];
    sortByFirstPointCoordinate(
        shapes: IShape[],
        coordinate: 'x' | 'y' | 'z',
        ascending?: boolean 
    ): IShape[];
} 