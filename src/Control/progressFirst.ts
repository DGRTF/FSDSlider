import { IControlObserverCoordinate } from './control';


export default class ProgressFirst implements IControlObserverCoordinate {
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

  private Init() {
    this.progressElement = document.createElement('div');

    if (this.orientation) {
      if (this.range) {
        this.progressElement.className += ' slider-progress slider-progress-first';
      } else {
        this.progressElement.className += ' slider-progress slider-progress-first-one';
      }
    } else {
      this.progressElement.className += ' slider-progress-vertical slider-progress-first';
    }

    this.parentElement.appendChild(this.progressElement);
  }

  SetCoordinatePercent(coordinatePercent: number) {
    if (coordinatePercent <= 100 && coordinatePercent >= 0) {
      if (this.orientation) {
        this.progressElement.style.minWidth = `${(this.parentElement.offsetWidth * coordinatePercent) / 100}px`;
      } else {
        this.progressElement.style.minHeight = `${(this.parentElement.offsetHeight * (100 - coordinatePercent)) / 100}px`;
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
