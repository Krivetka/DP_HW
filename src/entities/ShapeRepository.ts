import { IShape } from "./interfaces/IShape";
import { IShapeRepository } from "./interfaces/IShapeRepository";

export class ShapeRepository implements IShapeRepository {
    private shapes: IShape[] = [];

    add(shape: IShape): void {
        this.shapes.push(shape);
    }

    remove(name: string): void {
        const index = this.shapes.findIndex(s => s.name === name);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }

    getAll(): IShape[] {
        return [...this.shapes];
    }

    getByName(name: string): IShape[] {
        return this.shapes.filter(shape => shape.name === name);
    }

    getByType(type: string): IShape[] {
        return this.shapes.filter(shape => shape.name.startsWith(type));
    }

    clear(): void {
        this.shapes = [];
    }
} 