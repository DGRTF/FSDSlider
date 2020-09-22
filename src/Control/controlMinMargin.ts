import {
  IControlObserverCoordinate,
  IControlMin
} from './control';


export default class MinMargin implements IControlObserverCoordinate {
  constructor(minValue: IControlMin[] = null) {
    this.minValue = minValue;
  }

  private minValue: IControlMin[];

  SetCoordinatePercent(coordinatePercent: number) {
    if (this.minValue !== null) {
      this.minValue.forEach((el) => {
        el.SetMinMargin(coordinatePercent);
      });
    }
  }

  AddMinMarginObserver(minValue: IControlMin) {
    this.minValue.push(minValue);
  }

  DeleteMinMarginObserver(minValue: IControlMin) {
    const index = this.minValue.indexOf(minValue);
    if (index > -1) {
      this.minValue.splice(index, 1);
    }
  }



  // for tests

  GetObserver(): IControlMin[] {
    return this.minValue.slice();
  }

}
