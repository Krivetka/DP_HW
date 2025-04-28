import * as path from "path";
import { FileParser } from "./utils/FileParser";
import logger from "./utils/logger";
import {
  FileParseError,
  InvalidDataException,
} from "./exceptions/CustomErrors";

try {
  const filePath = path.join(__dirname, "data", "shapes.txt");
  logger.info("Reading file:", { path: filePath });

  FileParser.parseFile(filePath);
  logger.info("File parsing completed successfully");
} catch (error) {
  if (error instanceof FileParseError) {
    logger.error("File parsing error:", {
      error: error.message,
      stack: error.stack,
    });
  } else if (error instanceof InvalidDataException) {
    logger.error("Invalid data error:", {
      error: error.message,
      stack: error.stack,
    });
  } else {
    logger.error("Unexpected error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
