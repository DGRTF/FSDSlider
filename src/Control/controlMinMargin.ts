import {
  IControlObserverCoordinate,
  IControlMin
} from './control';


export default class MinMargin implements IControlObserverCoordinate {
  constructor(minValue: IControlMin[] = null) {
    this.minValue = minValue;
  }

  private minValue: IControlMin[];

  setCoordinatePercent(coordinatePercent: number) {
    if (this.minValue) {
      this.minValue.forEach((el) => {
        el.setMinMargin(coordinatePercent);
      });
    }
  }

  addMinMarginObserver(minValue: IControlMin) {
    this.minValue.push(minValue);
  }

  deleteMinMarginObserver(minValue: IControlMin) {
    const index = this.minValue.indexOf(minValue);
    
    if (index > -1) {
      this.minValue.splice(index, 1);
    }
  }



  // for tests

  getObserver(): IControlMin[] {
    return this.minValue.slice();
  }

}
