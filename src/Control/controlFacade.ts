import {
  IHandle,
  IControlObservable,
  IControlObserverCoordinate,
  Control,
  IControlMax,
} from './control';
import HandleX from './controlHandleX';
import HandleY from './controlHandleY';
import MinMargin from './controlMinMargin';
import MaxMargin from './controlMaxMargin';
import ScaleSetMargin from './scaleSetMargin';


export default class ControlFacade {
  constructor(parentElement: HTMLElement,
    orientation: boolean = true, range: boolean = false) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.range = range;
    this.initialize();
  }

  private parentElement: HTMLElement;

  private orientation: boolean;

  private range: boolean;

  private handleArr: IHandle[];

  private handleArrObservable: IControlObservable[];

  private handleMaxMargin: IControlMax[] = [];

  private size: number;

  private scale: ScaleSetMargin;

  private initialize() {

    if (this.orientation)
      this.intervalCheckSize();
    let controlOne;

    if (this.orientation) {
      controlOne = new HandleX(this.parentElement);
    } else {
      controlOne = new HandleY(this.parentElement);
    }

    let controlOne1;

    if (this.range) {
      if (this.orientation) {
        controlOne1 = new HandleX(this.parentElement);
      } else {
        controlOne1 = new HandleY(this.parentElement);
      }
    }

    let control;

    this.scale = new ScaleSetMargin(this.parentElement, this.orientation);

    if (this.range) {
      control = new Control(this.parentElement, this.orientation, [controlOne, controlOne1]);

      let minMargin;
      let maxMargin;

      if (!this.orientation) {
        minMargin = new MinMargin([controlOne]);
        controlOne1.addObserver(minMargin);
        maxMargin = new MaxMargin([controlOne1]);
        controlOne.addObserver(maxMargin);
      } else {
        minMargin = new MinMargin([controlOne1]);
        controlOne.addObserver(minMargin);
        maxMargin = new MaxMargin([controlOne]);
        controlOne1.addObserver(maxMargin);
      }
      this.handleArr = [controlOne, controlOne1];
      this.handleArrObservable = [controlOne, controlOne1];
      this.handleMaxMargin = [controlOne, controlOne1];

      this.scale.addHandle(controlOne1);
      this.scale.addHandle(controlOne);
    } else {
      control = new Control(this.parentElement, this.orientation, [controlOne]);

      this.handleArr = [controlOne];
      this.handleArrObservable = [controlOne];
      this.handleMaxMargin = [controlOne];

      this.scale.addHandle(controlOne);
    }
  }

  private intervalCheckSize() {
    this.size = this.parentElement.offsetWidth;
    setInterval(() => {
      if (this.parentElement.offsetWidth !== this.size) {
        this.handleMaxMargin[this.handleMaxMargin.length - 1].setMaxMargin(1);

        if (this.parentElement.offsetWidth > this.size) {
          for (let i = this.handleArr.length - 1; i >= 0; i--) {
            this.handleArr[i].setCurrentMarginPercent(this.handleArr[i].getSetSelectValue())
          }
        }
        else
          this.handleArr.forEach(el => {
            el.setCurrentMarginPercent(el.getSetSelectValue());
          });

        this.size = this.parentElement.offsetWidth;
      }
    }, 50);
  }


  setCurrentMarginPercent(percent: number, numb: number) {
    const isNumbRange = numb < this.handleArr.length && numb >= 0;

    if (isNumbRange) {
      this.handleArr[numb].setCurrentMarginPercent(percent);
    }
  }

  addObserverHandle(observer: IControlObserverCoordinate, numb: number) {
    const isNumbRange = numb < this.handleArrObservable.length && numb >= 0;

    if (isNumbRange) {
      this.handleArrObservable[numb].addObserver(observer);
    }
  }

  deleteObserverHandle(observer: IControlObserverCoordinate, numb: number) {
    const isNumbRange = numb < this.handleArrObservable.length && numb >= 0;

    if (isNumbRange) {
      this.handleArrObservable[numb].deleteObserver(observer);
    }
  }

  hideScale() {
    this.scale.hideScale();
  }

  showScale() {
    this.scale.showScale();
  }

  updateHandle() {
    this.handleArr.forEach(el => {
      el.setCurrentMarginPercent(el.getSetSelectValue());
    });
  }

}
