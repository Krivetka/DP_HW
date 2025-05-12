import { IShape } from "../entities/interfaces/IShape";
import { IShapeSortService } from "../entities/interfaces/IShapeSortService";

export class ShapeSortService implements IShapeSortService {
    sortByName(shapes: IShape[], ascending: boolean = true): IShape[] {
        return [...shapes].sort((a, b) => {
            const result = a.name.localeCompare(b.name);
            return ascending ? result : -result;
        });
    }

    sortByFirstPointCoordinate(
        shapes: IShape[],
        coordinate: 'x' | 'y' | 'z',
        ascending: boolean = true
    ): IShape[] {
        return [...shapes].sort((a, b) => {
            const aVal = a.points[0]?.[coordinate] ?? 0;
            const bVal = b.points[0]?.[coordinate] ?? 0;
            const result = aVal - bVal;
            return ascending ? result : -result;
        });
    }
}
