import { IControlObserverCoordinate } from "./control";


export class ProgressLast implements IControlObserverCoordinate {
  constructor(parentElement: HTMLElement, orientation: boolean = true) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.Init();
  }

  private parentElement: HTMLElement;

  private orientation: boolean;

  private progressElement: HTMLElement;

  private Init() {
    this.progressElement = document.createElement("div");

    if (this.orientation) {
      this.progressElement.className += " slider-progress";
    }
    else {
      this.progressElement.className += " slider-progress-vertical";
    }
    this.parentElement.appendChild(this.progressElement);
  }

  SetCoordinatePercent(coordinatePercent: number) {
    if (coordinatePercent <= 100 && coordinatePercent >= 0) {
      if (this.orientation) {
        this.progressElement.style.minWidth = `${this.parentElement.clientWidth - this.parentElement.clientWidth * coordinatePercent / 100}px`;
      }
      else {
        this.progressElement.style.minHeight = `${this.parentElement.clientHeight - this.parentElement.clientHeight * coordinatePercent / 100}px`;
      }
    }
  }


  // for tests

  GetWidthOrHeight(): string {
    if (this.orientation) {
      return this.progressElement.style.minWidth;
    }
    else {
      return this.progressElement.style.minHeight;
    }
  }

}