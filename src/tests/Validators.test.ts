import Point from "../entities/Point";
import ShapeService from "../services/ShapeService";
import Rectangle from "../entities/Rectangle";
import Tetrahedron from "../entities/Tetrahedron";

describe("Shape Validators", () => {
  describe("Rectangle Validation", () => {
    it("should validate correct rectangle", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ];
      expect(ShapeService.isValidRectangle(points)).toBe(true);
    });

    it("should reject rectangle with wrong number of points", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
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

  describe("Tetrahedron Validation", () => {
    it("should validate correct tetrahedron", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: 0, z: 1 },
      ];
      expect(ShapeService.isValidTetrahedron(points)).toBe(true);
    });

    it("should reject tetrahedron with wrong number of points", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
      ];
      expect(ShapeService.isValidTetrahedron(points)).toBe(false);
    });

    it("should reject degenerate tetrahedron", () => {
      const points: Point[] = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 0.5, y: 0.5, z: 0 },
      ];
      expect(ShapeService.isValidTetrahedron(points)).toBe(false);
    });
  });

  describe("Shape Validation", () => {
    it("should validate correct shapes", () => {
      const rectangle = new Rectangle([
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 2, y: 2, z: 0 },
        { x: 0, y: 2, z: 0 },
      ]);
      const tetrahedron = new Tetrahedron([
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: 0, z: 1 },
      ]);
      expect(ShapeService.isValidShape(rectangle)).toBe(true);
      expect(ShapeService.isValidShape(tetrahedron)).toBe(true);
    });

    it("should reject invalid shapes", () => {
      const invalidShape = new Rectangle([
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
      ]);
      expect(ShapeService.isValidShape(invalidShape)).toBe(false);
    });
  });
});
