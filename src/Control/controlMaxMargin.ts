import { IControlMax, IControlObserverCoordinate } from "./control";


export class MaxMargin implements IControlObserverCoordinate {
  constructor(maxValue: IControlMax[] = null) {
    this.maxValue = maxValue;
  }

  private maxValue: IControlMax[];

  SetCoordinatePercent(coordinatePercent: number) {
    if (this.maxValue !== null) {
      this.maxValue.forEach(el => {
        el.SetMaxMargin(coordinatePercent);
      });
    }
  }

}