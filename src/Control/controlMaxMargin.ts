import { IControlMax, IControlObserverCoordinate } from './control';


export default class MaxMargin implements IControlObserverCoordinate {
  constructor(maxValue: IControlMax[] = null) {
    this.maxValue = maxValue;
  }

  private maxValue: IControlMax[];

  SetCoordinatePercent(coordinatePercent: number) {
    if (this.maxValue !== null) {
      this.maxValue.forEach((el) => {
        el.SetMaxMargin(coordinatePercent);
      });
    }
  }

  AddMaxMarginObserver(maxValue: IControlMax){
    this.maxValue.push(maxValue);
  }

  DeleteMaxMarginObserver(maxValue: IControlMax){
    const index = this.maxValue.indexOf(maxValue);
    if (index > -1) {
      this.maxValue.splice(index, 1);
    }
  }

  

  // for tests

  GetObserver(): IControlMax[] {
    const observer: IControlMax[] = [];
    this.maxValue.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }

}
