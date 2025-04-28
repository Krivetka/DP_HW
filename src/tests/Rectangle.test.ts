import Point from "../entities/Point";
import ShapeFactory from "../factories/ShapeFactory";
import ShapeService from "../services/ShapeService";
import {
  CalculationException,
  InvalidDataException,
} from "../exceptions/CustomErrors";

describe("Rectangle", () => {
  describe("Creation", () => {
    it("should create rectangle with valid points", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ];
      const rectangle = ShapeFactory.createShape("Rectangle", points);
      expect(rectangle).not.toBeNull();
      if (rectangle) {
        expect(rectangle.points).toEqual(points);
      }
    });

    it("should throw error for invalid number of points", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
      ];
      expect(() => ShapeFactory.createShape("Rectangle", points)).toThrow(
        InvalidDataException,
      );
    });
  });

  describe("Validation", () => {
    it("should validate correct rectangle", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ];
      expect(ShapeService.isValidRectangle(points)).toBe(true);
    });

    it("should validate incorrect rectangle", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 7, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ];
      expect(ShapeService.isValidRectangle(points)).toBe(false);
    });

    it("should reject non-rectangular shape", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
        { x: 1, y: 3, z: 0 },
      ];
      expect(ShapeService.isValidRectangle(points)).toBe(false);
    });
  });

  describe("Calculations", () => {
    it("should calculate area correctly", () => {
      const rectangle = ShapeFactory.createShape("Rectangle", [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ]);
      expect(rectangle).not.toBeNull();
      if (rectangle) {
        expect(ShapeService.calculateArea(rectangle)).toBe(4);
      }
    });

    it("should calculate perimeter correctly", () => {
      const rectangle = ShapeFactory.createShape("Rectangle", [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ]);
      expect(rectangle).not.toBeNull();
      if (rectangle) {
        expect(ShapeService.calculatePerimeter(rectangle)).toBe(8);
      }
    });

    it("should throw error for volume calculation", () => {
      const rectangle = ShapeFactory.createShape("Rectangle", [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ]);
      expect(rectangle).not.toBeNull();
      if (rectangle) {
        expect(() => ShapeService.calculateVolume(rectangle)).toThrow(
          CalculationException,
        );
      }
    });
  });
});
