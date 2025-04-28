import * as fs from "fs";
import Point from "../entities/Point";
import logger from "./logger";
import { FileParseError } from "../exceptions/CustomErrors";
import { ERROR_MESSAGES } from "./constants";
import PointService from "../services/PointService";

export interface ParsedShapeData {
  type: string;
  points: Point[];
}

export class FileParser {
  static parseFile(filePath: string): ParsedShapeData[] {
    const shapesData: ParsedShapeData[] = [];

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");

      for (const line of lines) {
        if (line.trim().length === 0 || line.trim().startsWith("#")) {
          continue;
        }

        const parts = line
          .trim()
          .split(" ")
          .filter((p) => p.length > 0);

        if (parts.length < 2) {
          logger.warn(ERROR_MESSAGES.INVALID_LINE_FORMAT, { line });
          continue;
        }

        const type = parts[0];
        const pointStrings = parts.slice(1);

        try {
          const points = PointService.createPointsFromStrings(
            pointStrings,
            type,
          );
          if (points.length > 0) {
            shapesData.push({ type, points });
            logger.info(
              `Successfully processed shape: ${type} with points: ${points.map((p) => `(${p.x},${p.y},${p.z})`).join(" ")}`,
            );
          }
        } catch (error) {
          logger.warn(ERROR_MESSAGES.INVALID_POINT_DATA, { error });
        }
      }
    } catch (error) {
      logger.error(ERROR_MESSAGES.FILE_READ_ERROR, { error });
      throw new FileParseError(ERROR_MESSAGES.FILE_READ_ERROR);
    }

    logger.info(`Total parsed shapes data: ${shapesData.length}`);
    return shapesData;
  }
}
