import { IControlObserverCoordinate } from './control';


export default class ProgressLast implements IControlObserverCoordinate {
  constructor(parentElement: HTMLElement, orientation: boolean = true, range: boolean = true) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.range = range;
    this.Init();
  }

  private range: boolean;

  private parentElement: HTMLElement;

  private orientation: boolean;

  private progressElement: HTMLElement;

  private width: number;

  private Init() {
    this.progressElement = document.createElement('div');

    if (this.orientation) {
      this.progressElement.className += ' slider-progress slider-progress-last';
    } else if (this.range) {
      this.progressElement.className += ' slider-progress-vertical slider-progress-vertical-last-one';
    } else {
      this.progressElement.className += ' slider-progress-vertical slider-progress-vertical-last';
    }
    this.parentElement.appendChild(this.progressElement);
  }

  SetCoordinatePercent(coordinatePercent: number) {
    if (coordinatePercent <= 100 && coordinatePercent >= 0) {
      if (this.orientation) {
        this.width = -this.parentElement.clientWidth * coordinatePercent;
        this.width = this.width / 100 + this.parentElement.clientWidth;
        this.progressElement.style.minWidth = `${this.width}px`;
      } else {
        this.width = -this.parentElement.clientHeight * (100 - coordinatePercent);
        this.width = this.width / 100 + this.parentElement.clientHeight;
        this.progressElement.style.minHeight = `${this.width}px`;
      }
    }
  }


  // for tests

  GetWidthOrHeight(): string {
    if (this.orientation) {
      return this.progressElement.style.minWidth;
    }
    return this.progressElement.style.minHeight;
  }
}