import ProgressFirst from './progressFirst';
import ProgressLast from './progressLast';

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
  GetSetSelectValue(): number;
}

export interface IControlMin {
  SetMinMargin(minMargin: number): void;
}

export interface IControlMax {
  SetMaxMargin(maxMargin: number): void;
}


export class Control {
  constructor(
    parentElement: HTMLElement, orientation: boolean = true, handleArr: IControlObservable[],
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

  private progressFirst: ProgressFirst;

  private progressLast: ProgressLast;

  private Init() {
    this.CreateElementHTML();
    this.AddContent();
    this.AddProgress();
    this.AddObservers();
    this.AddClasses();
  }

  private CreateElementHTML() {
    this.trackElement = document.createElement('div');
    this.range = document.createElement('div');
  }

  private AddClasses() {
    this.range.className = "slider-progress-range";
    if (this.orientation) {
      this.trackElement.className += ' slider-track-element';
    } else {
      this.trackElement.className += ' slider-track-element-vertical';
    }
  }

  private AddContent() {
    this.parentElement.appendChild(this.trackElement);
  }

  private AddProgress() {
    if (this.handleArr.length === 2) {
      this.progressFirst = new ProgressFirst(this.trackElement, this.orientation);
      this.trackElement.appendChild(this.range);
      this.progressLast = new ProgressLast(this.trackElement, this.orientation, false);
    } else {
      this.progressFirst = new ProgressFirst(this.trackElement, this.orientation, false);
      this.trackElement.appendChild(this.range);
      this.progressLast = new ProgressLast(this.trackElement, this.orientation);
    }
  }

  private AddObservers() {
    if (this.orientation) {
      this.handleArr[0].AddObserver(this.progressFirst);
      this.handleArr[this.handleArr.length - 1].AddObserver(this.progressLast);
    } else {
      this.handleArr[0].AddObserver(this.progressLast);
      this.handleArr[this.handleArr.length - 1].AddObserver(this.progressFirst);
    }
  }
}
