import { IShapeFilter } from "../entities/interfaces/IShapeFilter";
import { IShape } from "../entities/interfaces/IShape";
import ShapeService from "./ShapeService";

export class ShapeFilterService implements IShapeFilter {
    getByQuadrant(shapes: IShape[], quadrant: number): IShape[] {
        return shapes.filter(shape => {
            return shape.points.every(point => {
                switch (quadrant) {
                    case 1: return point.x >= 0 && point.y >= 0;
                    case 2: return point.x <= 0 && point.y >= 0;
                    case 3: return point.x <= 0 && point.y <= 0;
                    case 4: return point.x >= 0 && point.y <= 0;
                    default: return false;
                }
            });
        });
    }

    getByAreaRange(shapes: IShape[], minArea: number, maxArea: number): IShape[] {
        return shapes.filter(shape => {
            try {
                const area = ShapeService.calculateArea(shape);
                return area >= minArea && area <= maxArea;
            } catch {
                return false;
            }
        });
    }

    getByVolumeRange(shapes: IShape[], minVolume: number, maxVolume: number): IShape[] {
        return shapes.filter(shape => {
            try {
                const volume = ShapeService.calculateVolume(shape);
                return volume >= minVolume && volume <= maxVolume;
            } catch {
                return false;
            }
        });
    }

    getByPerimeterRange(shapes: IShape[], minPerimeter: number, maxPerimeter: number): IShape[] {
        return shapes.filter(shape => {
            try {
                const perimeter = ShapeService.calculatePerimeter(shape);
                return perimeter >= minPerimeter && perimeter <= maxPerimeter;
            } catch {
                return false;
            }
        });
    }

    getByDistanceRange(shapes: IShape[], minDistance: number, maxDistance: number): IShape[] {
        return shapes.filter(shape => {
            const distances = shape.points.map(point => 
                Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z)
            );
            const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
            return avgDistance >= minDistance && avgDistance <= maxDistance;
        });
    }
} 