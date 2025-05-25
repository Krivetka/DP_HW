import * as path from "path";
import { FileParser } from "./utils/FileParser";
import Point from "./entities/Point";
import logger from "./utils/logger";
import {
  FileParseError,
  InvalidDataException,
} from "./exceptions/CustomErrors";
import ShapeFactory from "./factories/ShapeFactory";
import { ShapeRepository } from "./entities/ShapeRepository";
import { ShapeFilterService } from "./services/ShapeFilterService";
import { ShapeSortService } from "./services/ShapeSortService";
import { Warehouse } from "./entities/Warehouse";
import { IShape } from "./entities/interfaces/IShape";

const repository = new ShapeRepository();
const filterService = new ShapeFilterService();
const sortService = new ShapeSortService();
const warehouse = new Warehouse();

function loadShapesFromFile(filePath: string): void {
  const shapesData = FileParser.parseFile(filePath);
  logger.info("File parsing completed successfully");

  shapesData.forEach(({ type, points }) => {
    try {
      const shape = ShapeFactory.createShape(type, points);
      if (shape) {
        repository.add(shape);
        shape.addObserver(warehouse);
        warehouse.setMetrics(shape);
        logger.info(`Created ${type} shape successfully`);
      }
    } catch (error) {
      logger.error(`Failed to create ${type} shape:`, { error: error instanceof Error ? error.message : "Unknown error" });
    }
  });
}

function displayShapesByType(): void {
  const allShapes = repository.getAll();
  logger.info(`Total shapes in repository: ${allShapes.length}`);

  const rectangles = repository.getByType("Rectangle");
  const tetrahedrons = repository.getByType("Tetrahedron");
  
  logger.info("Rectangles:");
  logger.info(rectangles.map(shape => shape.name));
  logger.info("Tetrahedrons:");
  logger.info(tetrahedrons.map(shape => shape.name));
}

function displayFilteredShapes(): void {
  const allShapes = repository.getAll();

  const firstQuadrantShapes = filterService.getByQuadrant(allShapes, 1);
  logger.info("Shapes in first quadrant:");
  logger.info(firstQuadrantShapes.map(shape => shape.name));

  const shapesInAreaRange = filterService.getByAreaRange(allShapes, 1, 4);
  logger.info("Shapes with area between 1 and 4:");
  logger.info(shapesInAreaRange.map(shape => shape.name));

  const shapesInVolumeRange = filterService.getByVolumeRange(allShapes, 5, 15);
  logger.info("Shapes with volume between 5 and 15:");
  logger.info(shapesInVolumeRange.map(shape => shape.name));

  const shapesInPerimeterRange = filterService.getByPerimeterRange(allShapes, 2, 30);
  logger.info("Shapes with perimeter between 2 and 30:");
  logger.info(shapesInPerimeterRange.map(shape => shape.name));

  const shapesInDistanceRange = filterService.getByDistanceRange(allShapes, 3, 10);
  logger.info("Shapes with average distance between 3 and 10 from origin:");
  logger.info(shapesInDistanceRange.map(shape => shape.name));
}

function demonstrateRepositoryOperations(): void {
  const rectangles = repository.getByType("Rectangle");
  const shapeToRemove = rectangles[0];
  repository.remove(shapeToRemove.name);
  logger.info("Removed one rectangle from repository");
  logger.info(repository.getAll().map(shape => shape.name));
  
  const points = [
    new Point(0, 0),
    new Point(2, 0),
    new Point(2, 2),
    new Point(0, 2)
  ];
  const newShape = ShapeFactory.createShape("Rectangle", points);
  if (newShape) {
    repository.add(newShape);
    logger.info("Added new rectangle to repository");
  }
  
  logger.info(repository.getAll().map(shape => shape.name));
}

function demonstrateSorting(): void {
  const sortedByName = sortService.sortByName(repository.getAll());
  logger.info("Shapes sorted by name:");
  logger.info(sortedByName.map(shape => shape.name));

  const sortedByX = sortService.sortByFirstPointCoordinate(repository.getAll(), 'x');
  logger.info("Shapes sorted by X coordinate of first point:");
  logger.info(sortedByX.map(shape => `${shape.name}: x=${shape.points[0]?.x}`));

  const sortedByZ = sortService.sortByFirstPointCoordinate(repository.getAll(), 'z', false);
  logger.info("Shapes sorted by Z coordinate of first point:");
  logger.info(sortedByZ.map(shape => `${shape.name}: z=${shape.points[0]?.z}`));
}

function checkWarehouse(): void {
  const shapes = repository.getAll();
  
  shapes.forEach((shape: IShape) => {
    const metrics = warehouse.get(shape.name);
    logger.info(`Shape: ${shape.name}`);
    if (metrics) {
      logger.info(`Metrics: Area = ${metrics.area||null}, Perimeter = ${metrics.perimeter||null}, Volume = ${metrics.volume||null}`);
    }
  });
}

function updateWarehouse(): void {
  const shapes = repository.getAll();
  
  shapes.forEach((shape: IShape) => {
    try {
      const newPoints = shape.points.map(point => 
        new Point(point.x * Math.random()*10, point.y * Math.random()*10, point.z )
      );
      shape.updatePoints(newPoints);
      const metrics = warehouse.get(shape.name);
      logger.info(`Shape: ${shape.name}`);
      if (metrics) {
        logger.info(`Metrics: Area = ${metrics.area||null}, Perimeter = ${metrics.perimeter||null}, Volume = ${metrics.volume||null}`);
      }
    } catch (error) {
      logger.error(`Failed to update shape ${shape.name}:`, error);
    }
  });
}

function handleError(error: unknown): void {
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

function main(): void {
  try {
    const filePath = path.join(__dirname, "data", "shapes.txt");
    logger.info("Reading file:", { path: filePath });

    loadShapesFromFile(filePath);
    logger.info("_____________________________");
    displayShapesByType();
    logger.info("_____________________________");
    displayFilteredShapes();
    logger.info("_____________________________");
    demonstrateRepositoryOperations();
    logger.info("_____________________________");
    demonstrateSorting();
    logger.info("_____________________________");
    checkWarehouse();
    logger.info("_____________________________");
    updateWarehouse();
  } catch (error) {
    handleError(error);
  }
}

main();
