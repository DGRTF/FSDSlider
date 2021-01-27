import { IControlObserverCoordinate } from './control';


export default class ProgressLast implements IControlObserverCoordinate {
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

  private width: number;

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
      this.progressElement.className += ' slider-progress slider-progress-last';
    } else if (this.range) {
      this.progressElement.className += ' slider-progress-vertical slider-progress-vertical-last-one';
    } else {
      this.progressElement.className += ' slider-progress-vertical slider-progress-vertical-last';
    }
  }

  private addContentHTML() {
    this.parentElement.appendChild(this.progressElement);
  }

  setCoordinatePercent(coordinatePercent: number) {
    const isCoordinatePercentRange = coordinatePercent <= 1 && coordinatePercent >= 0;

    if (isCoordinatePercentRange) {
      if (this.orientation) {
        this.width = -this.parentElement.offsetWidth * coordinatePercent;
        this.width += this.parentElement.offsetWidth;
        this.progressElement.style.minWidth = `${this.width}px`;
      } else {
        this.width = -this.parentElement.offsetHeight * (1 - coordinatePercent);
        this.width += this.parentElement.offsetHeight;
        this.progressElement.style.minHeight = `${this.width}px`;
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
