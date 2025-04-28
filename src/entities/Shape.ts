import Point from "./Point";

abstract class Shape {
  readonly name: string;

  readonly points: Point[];

  protected constructor(points: Point[]) {
    this.name = this.constructor.name;
    this.points = points;
  }
}

export default Shape;
