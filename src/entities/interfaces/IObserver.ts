import { IShape } from "./IShape";

export interface IObserver {
  update(figure: IShape): void;
} 