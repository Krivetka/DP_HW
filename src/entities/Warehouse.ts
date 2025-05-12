import { IShape } from "./interfaces/IShape";
import { IWarehouse, Metrics } from "./interfaces/IWarehouse";
import ShapeService from "../services/ShapeService";

export class Warehouse implements IWarehouse {
    private static instance: Warehouse;
    private metrics: Map<string, Metrics>;

    private constructor() {
        this.metrics = new Map<string, Metrics>();
    }

    public static getInstance(): Warehouse {
        if (!Warehouse.instance) {
            Warehouse.instance = new Warehouse();
        }
        return Warehouse.instance;
    }

    update(shape: IShape): void {
        const metrics: Metrics = {
            area: ShapeService.calculateArea(shape),
            volume: ShapeService.calculateVolume(shape),
            perimeter: ShapeService.calculatePerimeter(shape)
        };
        this.metrics.set(shape.name, metrics);
    }

    get(shapeName: string): Metrics | undefined {
        return this.metrics.get(shapeName);
    }

    remove(shapeName: string): void {
        this.metrics.delete(shapeName);
    }

    clear(): void {
        this.metrics.clear();
    }
} 