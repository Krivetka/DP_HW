import Rectangle from "../entities/Rectangle";
import Tetrahedron from "../entities/Tetrahedron";
import Shape from "../entities/Shape";
import ShapeService from "../services/ShapeService";
import Point from "../entities/Point";
import { InvalidDataException } from "../exceptions/CustomErrors";

class ShapeFactory {
  static createShape(type: string, points: Point[]): Shape | null {
    switch (type.toLowerCase()) {
      case "rectangle":
        if (!ShapeService.isValidRectangle(points)) {
          throw new InvalidDataException("Invalid rectangle points");
        }
        return new Rectangle(points);
      case "tetrahedron":
        if (!ShapeService.isValidTetrahedron(points)) {
          throw new InvalidDataException("Invalid tetrahedron points");
        }
        return new Tetrahedron(points);
      default:
        return null;
    }
  }
}
export default ShapeFactory;
