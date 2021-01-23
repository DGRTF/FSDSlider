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
    this.Create();
    this.AddClasses();
    this.AddContentHTML();
  }

  private Create() {
    this.progressElement = document.createElement('div');
  }

  private AddClasses() {
    if (this.orientation) {
      if (this.range) {
        this.progressElement.className += ' slider-progress slider-progress-first';
      } else {
        this.progressElement.className += ' slider-progress slider-progress-first-one';
      }
    } else {
      this.progressElement.className += ' slider-progress-vertical slider-progress-first';
    }
  }

  private AddContentHTML() {
    this.parentElement.appendChild(this.progressElement);
  }

  SetCoordinatePercent(coordinatePercent: number) {
    const isCoordinatePercentRange = coordinatePercent <= 1 && coordinatePercent >= 0;

    if (isCoordinatePercentRange) {
      if (this.orientation) {
        this.progressElement.style.minWidth = `${this.parentElement.offsetWidth * coordinatePercent}px`;
      } else {
        this.progressElement.style.minHeight = `${this.parentElement.offsetHeight * (1 - coordinatePercent)}px`;
      }
    }
  }

  // for tests

  GetWidthOrHeight(): string {
    if (this.orientation)
      return this.progressElement.style.minWidth;
    return this.progressElement.style.minHeight;
  }
}
