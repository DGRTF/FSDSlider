import { IControlObserverCoordinate, IControlMin } from "./control";


export class MinMargin implements IControlObserverCoordinate {
  constructor(minValue: IControlMin[] = null) {
    this.minValue = minValue;
  }

  minValue: IControlMin[];

  SetCoordinatePercent(coordinatePercent: number) {
    if (this.minValue !== null) {
      this.minValue.forEach(el => {
        el.SetMinMargin(coordinatePercent);
      });
    }
  }

}