import Shape from "../entities/Shape";
import Rectangle from "../entities/Rectangle";
import Tetrahedron from "../entities/Tetrahedron";
import Point from "../entities/Point";
import { EPSILON, ERROR_MESSAGES } from "../utils/constants";
import { CalculationException } from "../exceptions/CustomErrors";

class ShapeService {
  static calculateArea(shape: Shape): number {
    if (shape instanceof Rectangle) {
      return this.calculateRectangleArea(shape);
    }
    if (shape instanceof Tetrahedron) {
      return this.calculateTetrahedronSurfaceArea(shape);
    }
    throw new CalculationException(ERROR_MESSAGES.INVALID_SHAPE);
  }

  static calculatePerimeter(shape: Shape): number {
    if (shape instanceof Rectangle) {
      return this.calculateRectanglePerimeter(shape);
    }
    throw new CalculationException(ERROR_MESSAGES.INVALID_SHAPE);
  }

  static calculateVolume(shape: Shape): number {
    if (shape instanceof Tetrahedron) {
      return this.calculateTetrahedronVolume(shape);
    }
    throw new CalculationException(ERROR_MESSAGES.INVALID_SHAPE);
  }

  static isValidShape(shape: Shape): boolean {
    if (shape instanceof Rectangle) {
      return this.isValidRectangle(shape.points);
    }
    if (shape instanceof Tetrahedron) {
      return this.isValidTetrahedron(shape.points);
    }
    return false;
  }

  private static calculateRectangleArea(rectangle: Rectangle): number {
    const [p1, p2, p3] = rectangle.points;
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p3.y);
    return width * height;
  }

  private static calculateRectanglePerimeter(rectangle: Rectangle): number {
    const [p1, p2, p3] = rectangle.points;
    const width = Math.abs(p1.x - p2.x);
    const height = Math.abs(p1.y - p3.y);
    return 2 * (width + height);
  }

  private static calculateTriangleArea(
    p1: Point,
    p2: Point,
    p3: Point,
  ): number {
    const ab = { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };
    const ac = { x: p3.x - p1.x, y: p3.y - p1.y, z: p3.z - p1.z };

    const cross = {
      x: ab.y * ac.z - ab.z * ac.y,
      y: ab.z * ac.x - ab.x * ac.z,
      z: ab.x * ac.y - ab.y * ac.x,
    };

    const crossMagnitude = Math.sqrt(
      cross.x ** 2 + cross.y ** 2 + cross.z ** 2,
    );
    return 0.5 * crossMagnitude;
  }

  private static calculateTetrahedronSurfaceArea(
    tetrahedron: Tetrahedron,
  ): number {
    const [p1, p2, p3, p4] = tetrahedron.points;
    return (
      this.calculateTriangleArea(p1, p2, p3) +
      this.calculateTriangleArea(p1, p2, p4) +
      this.calculateTriangleArea(p1, p3, p4) +
      this.calculateTriangleArea(p2, p3, p4)
    );
  }

  private static calculateTetrahedronVolume(tetrahedron: Tetrahedron): number {
    const [a, b, c, d] = tetrahedron.points;
    const ab = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const ac = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const ad = { x: d.x - a.x, y: d.y - a.y, z: d.z - a.z };

    const mixedProduct =
      ab.x * (ac.y * ad.z - ac.z * ad.y) -
      ab.y * (ac.x * ad.z - ac.z * ad.x) +
      ab.z * (ac.x * ad.y - ac.y * ad.x);

    return Math.abs(mixedProduct) / 6;
  }

  static isValidRectangle(points: Point[]): boolean {
    if (points.length !== 4) {
      return false;
    }

    const [p1, p2, p3, p4] = points;

    const vectors = [
      { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z },
      { x: p3.x - p2.x, y: p3.y - p2.y, z: p3.z - p2.z },
      { x: p4.x - p3.x, y: p4.y - p3.y, z: p4.z - p3.z },
      { x: p1.x - p4.x, y: p1.y - p4.y, z: p1.z - p4.z },
    ];

    for (let i = 0; i < 4; i++) {
      const a = vectors[i];
      const b = vectors[(i + 1) % 4];
      const dotProduct = a.x * b.x + a.y * b.y + a.z * b.z;
      if (Math.abs(dotProduct) > EPSILON) {
        return false;
      }
    }

    return true;
  }

  static isValidTetrahedron(points: Point[]): boolean {
    if (points.length !== 4) {
      return false;
    }

    const [p1, p2, p3, p4] = points;

    const volume =
      Math.abs(
        (p2.x - p1.x) *
          ((p3.y - p1.y) * (p4.z - p1.z) - (p3.z - p1.z) * (p4.y - p1.y)) -
          (p2.y - p1.y) *
            ((p3.x - p1.x) * (p4.z - p1.z) - (p3.z - p1.z) * (p4.x - p1.x)) +
          (p2.z - p1.z) *
            ((p3.x - p1.x) * (p4.y - p1.y) - (p3.y - p1.y) * (p4.x - p1.x)),
      ) / 6;

    return volume > EPSILON;
  }
}

export default ShapeService;
