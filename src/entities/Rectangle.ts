import { Shape } from "./Shape";
import Point from "./Point";

export default class Rectangle extends Shape {
  constructor(points: Point[]) {
    super(points);
  }
}
