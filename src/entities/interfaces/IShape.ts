import Point from "../Point";
import { Observable } from "../Observable";

export interface IShape extends Observable {
    readonly name: string;
    points: Point[];
    updatePoints(newPoints: Point[]): void;
} 