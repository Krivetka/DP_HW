import PointService from "../services/PointService";
import { ERROR_MESSAGES } from "../utils/constants";

describe("Point", () => {
  describe("PointService", () => {
    describe("validatePointFormat", () => {
      it("should validate correct point format", () => {
        expect(PointService.validatePointFormat("1,2,3")).toBe(true);
        expect(PointService.validatePointFormat("1.5,2.5,3.5")).toBe(true);
        expect(PointService.validatePointFormat("-1,-2,-3")).toBe(true);
      });

      it("should reject invalid point format", () => {
        expect(PointService.validatePointFormat("1,2")).toBe(true);
        expect(PointService.validatePointFormat("1,2,a")).toBe(false);
        expect(PointService.validatePointFormat("1,2,")).toBe(false);
        expect(PointService.validatePointFormat("")).toBe(false);
      });
    });

    describe("createPoint", () => {
      it("should create point from valid string", () => {
        const point = PointService.createPoint("1,2,3");
        expect(point).toEqual({ x: 1, y: 2, z: 3 });
      });

      it("should throw error for invalid point format", () => {
        expect(() => PointService.createPoint("1,2,a")).toThrow(
          ERROR_MESSAGES.INVALID_POINT_FORMAT,
        );
        expect(() => PointService.createPoint("1")).toThrow(
          ERROR_MESSAGES.INVALID_POINT_FORMAT,
        );
      });
    });

    describe("createPointsFromStrings", () => {
      it("should create points from valid strings", () => {
        const points = PointService.createPointsFromStrings(
          ["1,2", "3,2", "3,6", "1,6"],
          "Rectangle",
        );
        expect(points).toHaveLength(4);
        expect(points[0]).toEqual({ x: 1, y: 2 });
        expect(points[1]).toEqual({ x: 3, y: 2 });
        expect(points[2]).toEqual({ x: 3, y: 6 });
        expect(points[3]).toEqual({ x: 1, y: 6 });
      });

      it("should throw error for invalid point strings", () => {
        expect(() =>
          PointService.createPointsFromStrings(["1,2,a", "4,5,6"], "Rectangle"),
        ).toThrow();
      });

      it("should validate points count for shape type", () => {
        expect(() =>
          PointService.createPointsFromStrings(["1,2,3", "4,5,6"], "Rectangle"),
        ).toThrow("Invalid number of points for Rectangle. Expected 4, got 2");
      });
    });
  });
});
