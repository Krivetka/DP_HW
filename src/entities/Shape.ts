import Point from "./Point";
import { IShape } from "./interfaces/IShape";
import { Observable } from "./Observable";

export abstract class Shape extends Observable implements IShape {
  private static nameIndex: number = 0;
  readonly name: string;
  points: Point[];

  protected constructor(points: Point[]) {
    super();
    Shape.nameIndex++;
    this.name = `${this.constructor.name}_${Shape.nameIndex}`;
    this.points = points;
  }

  updatePoints(newPoints: Point[]): void {
    this.points = newPoints;
    this.notifyObservers(this);
  }
}


