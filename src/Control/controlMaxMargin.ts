import {
  IControlMax,
  IControlObserverCoordinate
} from './control';


export default class MaxMargin implements IControlObserverCoordinate {
  constructor(maxValue: IControlMax[] = null) {
    this.maxValue = maxValue;
  }

  private maxValue: IControlMax[];

  setCoordinatePercent(coordinatePercent: number) {
    if (this.maxValue) {
      this.maxValue.forEach((el) => {
        el.setMaxMargin(coordinatePercent);
      });
    }
  }

  addMaxMarginObserver(maxValue: IControlMax) {
    this.maxValue.push(maxValue);
  }

  deleteMaxMarginObserver(maxValue: IControlMax) {
    const index = this.maxValue.indexOf(maxValue);
    
    if (index > -1) {
      this.maxValue.splice(index, 1);
    }
  }



  // for tests

  getObserver(): IControlMax[] {
    return this.maxValue.slice();
  }

}
