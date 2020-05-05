import { IControlObserverCoordinate } from "../Control/control";

interface IModelObservable {
  AddObserver(modelObserver: IModelObserver): void;
  DeleteObserver(modelObserver: IModelObserver): void;
  Notify(): void;
}

export interface IModelObserver {
  GetValue(selectValue: string): void;
}

export interface IModel {
  // selectValue: string;
  PercentInValue(selectValue: number): number;
}

export class ModelNumber implements IModel, IModelObservable, IControlObserverCoordinate {
  private minValue: number;

  private step: number;

  private selectValue: string;

  private differentValue: number;

  private precision: number;

  private maxValue: number;

  private observer: IModelObserver[];

  constructor(minValue: number, maxValue: number,
    observer: IModelObserver[] = [], step: number = 10) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = step;
    this.differentValue = Math.abs(maxValue - minValue);
    this.observer = observer;
    this.selectValue = '';
    this.numDigitsAfterDecimal();
  }


  private numDigitsAfterDecimal() {
    const afterDecimalStr = this.step.toString().split('.')[1] || '';
    const minValueStr = this.minValue.toString().split('.')[1] || '';
    if (afterDecimalStr.length >= minValueStr.length) this.precision = afterDecimalStr.length;
    else this.precision = minValueStr.length;
  }


  SetCoordinatePercent(percent: number): void {
    if (percent <= 100 && percent >= 0) {

      const stepValue = Math.floor((this.differentValue * percent) / 100 / this.step);
      let val;

      if (this.precision > 0) {
        val = this.step * stepValue + this.minValue;
        this.selectValue = val.toFixed(this.precision);
      } else {
        val = this.step * stepValue;
        this.selectValue = String(val + this.minValue);
      }
      this.Notify();
    }
  }

  AddObserver(modelObserver: IModelObserver): void {
    this.observer.push(modelObserver);
  }

  DeleteObserver(modelObserver: IModelObserver): void {
    const index = this.observer.indexOf(modelObserver);
    if (index > -1) {
      this.observer.splice(index, 1);
    }
  }

  Notify(): void {
    if (this.observer !== null || this.observer !== undefined) {
      this.observer.forEach((el) => {
        el.GetValue(this.selectValue);
      });
    }
  }

  PercentInValue(selectValue: number): number {
    let percent = null;
    if (selectValue <= this.maxValue && selectValue >= this.minValue) {
      percent = (selectValue - this.minValue) / this.differentValue * 100;
    }
    return percent;
  }



  // For tests

  GetObserver(): IModelObserver[] {
    let observer: IModelObserver[] = [];
    this.observer.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }

  GetSelectValue(): string{
    return this.selectValue;
  }

}
