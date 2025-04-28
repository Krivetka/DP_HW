export class BaseAppException extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidDataException extends BaseAppException {
  constructor(message: string) {
    super(message, "InvalidDataException");
  }
}

export class CalculationException extends BaseAppException {
  constructor(message: string) {
    super(message, "CalculationException");
  }
}

export class FileParseError extends BaseAppException {
  constructor(message: string) {
    super(message, "FileParseError");
  }
}
