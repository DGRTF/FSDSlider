import ProgressFirst from './progressFirst';
import ProgressLast from './progressLast';

interface IControlObserverCoordinate {
  setCoordinatePercent(coordinate: number): void;
}

interface IControlObservable {
  addObserver(modelObserver: IControlObserverCoordinate): void;
  deleteObserver(modelObserver: IControlObserverCoordinate): void;
  notify(): void
}

interface IHandle {
  setCurrentMarginPercent(percent: number): void;
  getSetSelectValue(): number;
}

interface IControlMin {
  setMinMargin(minMargin: number): void;
}

interface IControlMax {
  setMaxMargin(maxMargin: number): void;
}


class Control {
  constructor(
    parentElement: HTMLElement, orientation: boolean = true, handleArr: IControlObservable[],
  ) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.handleArr = handleArr;
    this.initialize();
  }

  private orientation: boolean;

  private trackElement: HTMLElement;

  private parentElement: HTMLElement;

  private handleArr: IControlObservable[];

  private range: HTMLElement;

  private progressFirst: ProgressFirst;

  private progressLast: ProgressLast;

  private initialize() {
    this.createElementsHTML();
    this.addContent();
    this.addProgress();
    this.addObservers();
    this.addClasses();
  }

  private createElementsHTML() {
    this.trackElement = document.createElement('div');
    this.range = document.createElement('div');
  }

  private addClasses() {
    this.range.className = "slider-progress-range";
    if (this.orientation) {
      this.trackElement.className += ' slider-track-element';
    } else {
      this.trackElement.className += ' slider-track-element-vertical';
    }
  }

  private addContent() {
    this.parentElement.appendChild(this.trackElement);
  }

  private addProgress() {
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

  private addObservers() {
    if (this.orientation) {
      this.handleArr[0].addObserver(this.progressFirst);
      this.handleArr[this.handleArr.length - 1].addObserver(this.progressLast);
    } else {
      this.handleArr[0].addObserver(this.progressLast);
      this.handleArr[this.handleArr.length - 1].addObserver(this.progressFirst);
    }
  }
}

export {
  IControlObserverCoordinate,
  IControlObservable,
  IHandle,
  IControlMin,
  IControlMax,
  Control,
} 