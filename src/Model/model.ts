import { IControlObserverCoordinate } from "../Control/control";

export interface IModelObservable {
  AddObserver(modelObserver: IModelObserver): void;
  DeleteObserver(modelObserver: IModelObserver): void;
  Notify(): void;
}

export interface IModelObserver {
  GetValue(selectValue: string): void;
}

export interface IModel {
  PercentInValue(selectValue: string): number;
  SetStep(step: number): void;
  SetMaxValue(maxValue: number): void;
  SetMinValue(minValue: number): void;
  GetSelectValue(): string;
}

export interface IValue {
  ValueInPercent(percent: number): string;
}

export class ModelNumber implements IModel, IModelObservable, IControlObserverCoordinate, IValue {

  private minValue: number;

  private step: number;

  private selectValue: string;

  private differentValue: number;

  private precision: number;

  private maxValue: number;

  private observer: IModelObserver[];

  changeValue: Event;

  constructor(minValue: number, maxValue: number,
    observer: IModelObserver[] = []) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.step = 1;
    this.differentValue = Math.abs(maxValue - minValue);
    this.observer = observer;
    this.selectValue = '';
    this.Init();
  }


  private Init() {
    const afterDecimalStr = this.step.toString().split('.')[1] || '';
    const minValueStr = this.minValue.toString().split('.')[1] || '';
    if (afterDecimalStr.length >= minValueStr.length) this.precision = afterDecimalStr.length;
    else this.precision = minValueStr.length;
  }


  SetCoordinatePercent(percent: number): void {
    if (percent < 1 && percent > 0) {
      const currentValue = this.differentValue * percent;
      let stepValue: number;

      if ((currentValue % this.step) / this.step > 0.5) {
        stepValue = (this.differentValue * percent - (currentValue % this.step)) / this.step + 1;
      }
      else {
        stepValue = (this.differentValue * percent - (currentValue % this.step)) / this.step;
      }

      let val: number;

      if (this.precision > 0) {
        val = this.step * stepValue + this.minValue;
        this.selectValue = val.toFixed(this.precision);
      } else {
        val = this.step * stepValue + this.minValue;
        this.selectValue = `${val}`;
      }

    } else if (percent <= 0) {
      this.selectValue = `${this.minValue}`;
    } else
      this.selectValue = `${this.maxValue}`;
    this.Notify();
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
    if (this.observer !== null && this.observer !== undefined) {
      this.observer.forEach((el) => {
        el.GetValue(this.selectValue);
      });
    }
  }

  PercentInValue(selectValue: string): number {
    let percent = null;
    let numberValue = Number(selectValue);
    if (numberValue !== NaN)
      if (numberValue <= this.maxValue && numberValue >= this.minValue) {
        percent = (numberValue - this.minValue) / this.differentValue;
      }
    return percent;
  }

  SetStep(step: number) {
    if (step <= this.maxValue && step >= this.minValue) {
      this.step = step;
      this.Init();
    }
  }

  SetMaxValue(maxValue: number) {
    if (maxValue >= this.minValue) {
      this.maxValue = maxValue;
      this.differentValue = Math.abs(this.maxValue - this.minValue);
    }
  }

  SetMinValue(minValue: number) {
    if (minValue <= this.maxValue) {
      this.minValue = minValue;
      this.differentValue = Math.abs(this.maxValue - this.minValue);
      this.Init();
    }
  }

  GetSelectValue(): string {
    return this.selectValue;
  }

  ValueInPercent(percent: number): string {
    let value: string = null;
    if (percent <= 1 && percent >= 0) {
      value = `${this.minValue + this.differentValue * percent}`;
    }
    return value;
  }



  // For tests

  GetObserverLength(): number {
    return this.observer.length;
  }

  GetStep(): number {
    return this.step;
  }

  GetMinValue(): number {
    return this.minValue;
  }

  GetMaxValue(): number {
    return this.maxValue;
  }

}
