import {
  IHandle, IControlObservable, IControlObserverCoordinate, Control, IControlMax,
} from './control';
import HandleX from './controlHandleX';
import HandleY from './controlHandleY';
import MinMargin from './controlMinMargin';
import MaxMargin from './controlMaxMargin';


export default class ControlFacade {
  constructor(parentElement: HTMLElement,
    orientation: boolean = true, range: boolean = false) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.range = range;
    this.Init();
  }

  private parentElement: HTMLElement;

  private orientation: boolean;

  private range: boolean;

  private handleArr: IHandle[];

  private handleArrObservable: IControlObservable[];

  private handleMaxMargin: IControlMax[] = null;

  private size: number;

  private Init() {

    this.IntervalCheckSize();
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

    if (this.range) {
      control = new Control(this.parentElement, this.orientation, [controlOne, controlOne1]);

      let minMargin;
      let maxMargin;
      if (!this.orientation) {
        minMargin = new MinMargin([controlOne]);
        controlOne1.AddObserver(minMargin);
        maxMargin = new MaxMargin([controlOne1]);
        controlOne.AddObserver(maxMargin);
      } else {
        minMargin = new MinMargin([controlOne1]);
        controlOne.AddObserver(minMargin);
        maxMargin = new MaxMargin([controlOne]);
        controlOne1.AddObserver(maxMargin);
      }
      this.handleArr = [controlOne, controlOne1];
      this.handleArrObservable = [controlOne, controlOne1];
      this.handleMaxMargin = [controlOne, controlOne1];
    } else {
      control = new Control(this.parentElement, this.orientation, [controlOne]);

      this.handleArr = [controlOne];
      this.handleArrObservable = [controlOne];
      this.handleMaxMargin = [controlOne];
    }
  }

  private IntervalCheckSize(){
    this.size = this.parentElement.offsetWidth;
    setInterval(() => {
      if (this.parentElement.offsetWidth !== this.size) {
        if (this.handleMaxMargin !== null)
          this.handleMaxMargin[this.handleMaxMargin.length-1].SetMaxMargin(100);
        this.handleArr.forEach(el => {
          el.SetCurrentMarginPercent(el.GetSetSelectValue());
        });
        this.size = this.parentElement.offsetWidth;
      }
    }, 50);
  }


  SetCurrentMarginPercent(percent: number, numb: number) {
    if (numb < this.handleArr.length && numb >= 0) {
      this.handleArr[numb].SetCurrentMarginPercent(percent);
    }
  }

  AddObserverHandle(observer: IControlObserverCoordinate, numb: number) {
    if (numb < this.handleArrObservable.length && numb >= 0) {
      this.handleArrObservable[numb].AddObserver(observer);
    }
  }

  DeleteObserverHandle(observer: IControlObserverCoordinate, numb: number) {
    if (numb < this.handleArrObservable.length && numb >= 0) {
      this.handleArrObservable[numb].DeleteObserver(observer);
    }
  }
}