import { IShape } from "./IShape";

export interface IShapeRepository {
    add(shape: IShape): void;
    remove(name: string): void;
    getAll(): IShape[];
    getByName(name: string): IShape[];
    getByType(type: string): IShape[];
    clear(): void;
} 