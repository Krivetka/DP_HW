import { IObserver } from "./interfaces/IObserver";
import { IShape } from "./interfaces/IShape";

export abstract class Observable {
  private observers: IObserver[] = [];

  addObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  protected notifyObservers(figure: IShape): void {
    for (const observer of this.observers) {
      observer.update(figure);
    }
  }
} 