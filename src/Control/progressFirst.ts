import { IControlObserverCoordinate } from './control';


export default class ProgressFirst implements IControlObserverCoordinate {
  constructor(parentElement: HTMLElement, orientation: boolean = true, range: boolean = true) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.range = range;
    this.initialize();
  }

  private range: boolean;

  private parentElement: HTMLElement;

  private orientation: boolean;

  private progressElement: HTMLElement;

  private initialize() {
    this.create();
    this.addClasses();
    this.addContentHTML();
  }

  private create() {
    this.progressElement = document.createElement('div');
  }

  private addClasses() {
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

  private addContentHTML() {
    this.parentElement.appendChild(this.progressElement);
  }

  setCoordinatePercent(coordinatePercent: number) {
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

  getWidthOrHeight(): string {
    if (this.orientation)
      return this.progressElement.style.minWidth;
    return this.progressElement.style.minHeight;
  }
}
