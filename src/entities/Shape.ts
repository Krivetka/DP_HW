import Point from "./Point";
import { IShape } from "./interfaces/IShape";
import { Warehouse } from "./Warehouse";

export abstract class Shape implements IShape {
  private static nameIndex: number = 0;
  readonly name: string;
  points: Point[];

  protected constructor(points: Point[]) {
    Shape.nameIndex++;
    this.name = `${this.constructor.name}_${Shape.nameIndex}`;
    this.points = points;
  }

  protected updatePoints(newPoints: Point[]): void {
    this.points = newPoints;
    Warehouse.getInstance().update(this);
  }
}


