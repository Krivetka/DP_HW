import Point from "../entities/Point";
import logger from "../utils/logger";
import { ERROR_MESSAGES, REGEX } from "../utils/constants";

class PointService {
  static validatePointFormat(pointStr: string): boolean {
    const coords = pointStr.split(",");
    if (coords.length < 2) {
      return false;
    }

    return coords.every((coord) => REGEX.NUMBER.test(coord.trim()));
  }

  static createPoint(pointStr: string): Point {
    if (!this.validatePointFormat(pointStr)) {
      throw new Error(ERROR_MESSAGES.INVALID_POINT_FORMAT);
    }
    const [x, y, z] = pointStr.split(",").map(Number);
    return { x, y, z };
  }

  static validatePointsCount(type: string, points: Point[]): void {
    if (type === "Rectangle" && points.length !== 4) {
      throw new Error(
        `Invalid number of points for Rectangle. Expected 4, got ${points.length}`,
      );
    }
    if (type === "Tetrahedron" && points.length !== 4) {
      throw new Error(
        `Invalid number of points for Tetrahedron. Expected 4, got ${points.length}`,
      );
    }
  }

  static createPointsFromStrings(
    pointStrings: string[],
    type: string,
  ): Point[] {
    const points: Point[] = [];

    for (const pointStr of pointStrings) {
      try {
        const point = this.createPoint(pointStr);
        points.push(point);
      } catch (error) {
        logger.warn(`Invalid point data: "${pointStr}" in line`);
        throw error;
      }
    }

    this.validatePointsCount(type, points);
    return points;
  }
}

export default PointService;
