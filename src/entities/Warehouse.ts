import { Observable } from "./Observable";
import ShapeService from "../services/ShapeService";
import { IShape } from "./interfaces/IShape";
import logger from "../utils/logger";

export class Warehouse extends Observable {
    private static instance: Warehouse;
    private metrics: Map<string, { area?: number; perimeter?: number; volume?: number }> = new Map();

    constructor() {
        super();
        if (Warehouse.instance) {
            return Warehouse.instance;
        }
        Warehouse.instance = this;
    }

    public update(figure: IShape): void {
        this.setMetrics(figure);
    }

    get(figureId: string) {
        return this.metrics.get(figureId);
    }

    setMetrics(figure: IShape): void {
        try {
            const metrics: { area?: number; perimeter?: number; volume?: number } = {};
            
            try {
                metrics.area = ShapeService.calculateArea(figure);
            } catch (error) {}
            
            try {
                metrics.perimeter = ShapeService.calculatePerimeter(figure);
            } catch (error) {}
            
            try {
                metrics.volume = ShapeService.calculateVolume(figure);
            } catch (error) {}

            this.metrics.set(figure.name, metrics);
            logger.info(`Metrics set for shape ${figure.name}:`, this.metrics.get(figure.name));
        } catch (error) {
            logger.info(error);
        }
    }
}
