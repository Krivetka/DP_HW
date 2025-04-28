import Point from "../entities/Point";
import ShapeFactory from "../factories/ShapeFactory";
import ShapeService from "../services/ShapeService";
import {
  CalculationException,
  InvalidDataException,
} from "../exceptions/CustomErrors";

describe("Tetrahedron", () => {
  describe("Creation", () => {
    it("should create tetrahedron with valid points", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 2, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 6, z: Math.sqrt(6) / 3 },
      ];
      const tetrahedron = ShapeFactory.createShape("Tetrahedron", points);
      expect(tetrahedron).not.toBeNull();
      if (tetrahedron) {
        expect(tetrahedron.points).toEqual(points);
      }
    });

    it("should throw error for invalid number of points", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 2, z: 0 },
      ];
      expect(() => ShapeFactory.createShape("Tetrahedron", points)).toThrow(
        InvalidDataException,
      );
    });
  });

  describe("Validation", () => {
    it("should validate correct tetrahedron", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 2, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 6, z: Math.sqrt(6) / 3 },
      ];
      expect(ShapeService.isValidTetrahedron(points)).toBe(true);
    });

    it("should reject degenerate tetrahedron", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 3, y: 0, z: 0 },
      ];
      expect(ShapeService.isValidTetrahedron(points)).toBe(false);
    });
  });

  describe("Calculations", () => {
    it("should calculate volume correctly", () => {
      const tetrahedron = ShapeFactory.createShape("Tetrahedron", [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 2, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 6, z: Math.sqrt(6) / 3 },
      ]);
      expect(tetrahedron).not.toBeNull();
      if (tetrahedron) {
        expect(ShapeService.calculateVolume(tetrahedron)).toBeCloseTo(
          0.11785,
          5,
        );
      }
    });

    it("should calculate surface area correctly", () => {
      const tetrahedron = ShapeFactory.createShape("Tetrahedron", [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 2, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 6, z: Math.sqrt(6) / 3 },
      ]);
      expect(tetrahedron).not.toBeNull();
      if (tetrahedron) {
        expect(ShapeService.calculateArea(tetrahedron)).toBeCloseTo(1.73205, 5);
      }
    });

    it("should throw error for perimeter calculation", () => {
      const tetrahedron = ShapeFactory.createShape("Tetrahedron", [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 2, z: 0 },
        { x: 0.5, y: Math.sqrt(3) / 6, z: Math.sqrt(6) / 3 },
      ]);
      expect(tetrahedron).not.toBeNull();
      if (tetrahedron) {
        expect(() => ShapeService.calculatePerimeter(tetrahedron)).toThrow(
          CalculationException,
        );
      }
    });
  });
});
