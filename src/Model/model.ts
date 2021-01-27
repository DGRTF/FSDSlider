import { IControlObserverCoordinate } from "../Control/control";

interface IModelObservable {
  addObserver(modelObserver: IModelObserver): void;
  deleteObserver(modelObserver: IModelObserver): void;
  notify(): void;
}

interface IModelObserver {
  getValue(selectValue: string): void;
}

interface IModel {
  getPercentFromValue(selectValue: string): number;
  setStep(step: number): void;
  setMaxValue(maxValue: number): void;
  setMinValue(minValue: number): void;
  getSelectValue(): string;
}

interface IValue {
  getValueFromPercent(percent: number): string;
}

class ModelNumber implements IModel, IModelObservable, IControlObserverCoordinate, IValue {

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
    this.initialize();
  }


  private initialize() {
    const afterDecimalStr = this.step.toString().split('.')[1] || '';
    const minValueStr = this.minValue.toString().split('.')[1] || '';
    
    if (afterDecimalStr.length >= minValueStr.length) this.precision = afterDecimalStr.length;
    else this.precision = minValueStr.length;
  }


  setCoordinatePercent(percent: number): void {
    const isPercentRange = percent < 1 && percent > 0;
    if (isPercentRange) {
      const currentValue = this.differentValue * percent;
      let stepValue: number;
      const value = (currentValue % this.step) / this.step;

      if (value > 0.5) {
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
    this.notify();
  }

  addObserver(modelObserver: IModelObserver): void {
    this.observer.push(modelObserver);
  }

  deleteObserver(modelObserver: IModelObserver): void {
    const index = this.observer.indexOf(modelObserver);
    if (index > -1) {
      this.observer.splice(index, 1);
    }
  }

  notify(): void {
    if (this.observer) {
      this.observer.forEach((el) => {
        el.getValue(this.selectValue);
      });
    }
  }

  getPercentFromValue(selectValue: string): number {
    let percent = null;
    let numberValue = Number(selectValue);

    if (numberValue){
      const isValueRange = numberValue <= this.maxValue && numberValue >= this.minValue;

      if (isValueRange) {
        percent = (numberValue - this.minValue) / this.differentValue;
      }
    }
    
    return percent;
  }

  setStep(step: number) {
    const isStepRange = step <= this.maxValue && step >= this.minValue;
    if (isStepRange) {
      this.step = step;
      this.initialize();
    }
  }

  setMaxValue(maxValue: number) {
    if (maxValue >= this.minValue) {
      this.maxValue = maxValue;
      this.differentValue = Math.abs(this.maxValue - this.minValue);
    }
  }

  setMinValue(minValue: number) {
    if (minValue <= this.maxValue) {
      this.minValue = minValue;
      this.differentValue = Math.abs(this.maxValue - this.minValue);
      this.initialize();
    }
  }

  getSelectValue(): string {
    return this.selectValue;
  }

  getValueFromPercent(percent: number): string {
    let value: string = null;
    const isRange = percent <= 1 && percent >= 0;

    if (isRange) {
      value = `${this.minValue + this.differentValue * percent}`;
    }
    return value;
  }



  // For tests

  getObserverLength(): number {
    return this.observer.length;
  }

  getStep(): number {
    return this.step;
  }

  getMinValue(): number {
    return this.minValue;
  }

  getMaxValue(): number {
    return this.maxValue;
  }

}

export{
  IModelObservable,
  IModelObserver,
  IModel,
  IValue,
  ModelNumber,
}