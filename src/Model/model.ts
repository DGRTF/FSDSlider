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
  PercentInValue(selectValue: number): number;
  SetStep(step: number): void;
  SetMaxValue(maxValue: number): void;
  SetMinValue(minValue: number): void;
  GetSelectValue(): string;
  // AddHandlerChangeValue(listener: EventListenerOrEventListenerObject): void;
}

export class ModelNumber implements IModel, IModelObservable, IControlObserverCoordinate {

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
    // document.dispatchEvent(this.changeValue);
  }

  // AddHandlerChangeValue(listener: EventListenerOrEventListenerObject) {
  //   document.addEventListener("changeValue", listener)
  // }

  PercentInValue(selectValue: number): number {
    let percent = null;
    if (selectValue <= this.maxValue && selectValue >= this.minValue) {
      percent = (selectValue - this.minValue) / this.differentValue * 100;
    }
    return percent;
  }

  SetStep(step: number) {
    if (step <= this.maxValue && step >= this.minValue) {
      this.step = step;
    }
  }

  SetMaxValue(maxValue: number) {
    if (maxValue >= this.minValue) {
      this.maxValue = maxValue;
      this.differentValue = Math.abs(this.maxValue - this.minValue)
    }
  }

  SetMinValue(minValue: number) {
    if (minValue <= this.maxValue) {
      this.minValue = minValue;
      this.differentValue = Math.abs(this.maxValue - this.minValue)
    }
  }

  GetSelectValue(): string {
    return this.selectValue;
  }



  // For tests

  GetObserver(): IModelObserver[] {
    let observer: IModelObserver[] = [];
    this.observer.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }

}
