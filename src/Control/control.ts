import { ProgressFirst } from './progressFirst';
import { ProgressLast } from './progressLast';

export interface IControlObserverCoordinate {
  SetCoordinatePercent(coordinate: number): void;
}

export interface IControlObservable {
  AddObserver(modelObserver: IControlObserverCoordinate): void;
  DeleteObserver(modelObserver: IControlObserverCoordinate): void;
  Notify(): void
}

export interface IHandle {
  SetCurrentMarginPercent(percent: number): void;
}

export interface IControlMin {
  SetMinMargin(minMargin: number): void;
}

export interface IControlMax {
  SetMaxMargin(maxMargin: number): void;
}



export class Control {
  constructor(
    parentElement: HTMLElement, orientation: boolean = true, handleArr: IControlObservable[]
  ) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.handleArr = handleArr;
    this.Init();
  }

  private orientation: boolean;

  private trackElement: HTMLElement;

  private parentElement: HTMLElement;

  private handleArr: IControlObservable[];

  private range: HTMLElement;

  private Init() {
    this.trackElement = document.createElement('div');
    this.parentElement.appendChild(this.trackElement);

    let progressFirst;
    if (this.handleArr.length === 2) {
      progressFirst = new ProgressFirst(this.trackElement, this.orientation);
    }
    else {
      progressFirst = new ProgressFirst(this.trackElement, this.orientation, false);
    }

    this.range = document.createElement('div');
    this.range.style.width = "100%";
    this.range.style.height = "100%";
    this.range.style.background = "rgb(148, 175, 250)";
    this.trackElement.appendChild(this.range);

    let progressLast;
    if (this.handleArr.length === 2) {
      progressLast = new ProgressLast(this.trackElement, this.orientation, false);
    } else {
      progressLast = new ProgressLast(this.trackElement, this.orientation);
    }

    if (this.orientation) {
      this.handleArr[0].AddObserver(progressFirst);
      this.handleArr[this.handleArr.length - 1].AddObserver(progressLast);
    } else {
      this.handleArr[0].AddObserver(progressLast);
      this.handleArr[this.handleArr.length - 1].AddObserver(progressFirst);
    }

    this.AddClasses();
  }

  private AddClasses() {
    if (this.orientation) {
      this.trackElement.className += ' slider-track-element';
    }
    else {
      this.trackElement.className += ' slider-track-element-vertical';
    }
  }

}