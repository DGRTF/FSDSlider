import {
  IHandle, IControlObservable, IControlObserverCoordinate, Control, IControlMax,
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
    this.Init();
  }

  private parentElement: HTMLElement;

  private orientation: boolean;

  private range: boolean;

  private handleArr: IHandle[];

  private handleArrObservable: IControlObservable[];

  private handleMaxMargin: IControlMax[] = [];

  private size: number;

  private scale: ScaleSetMargin;

  private Init() {

    if (this.orientation)
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

    this.scale = new ScaleSetMargin(this.parentElement, this.orientation);

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

      this.scale.AddHandle(controlOne1);
      this.scale.AddHandle(controlOne);
    } else {
      control = new Control(this.parentElement, this.orientation, [controlOne]);

      this.handleArr = [controlOne];
      this.handleArrObservable = [controlOne];
      this.handleMaxMargin = [controlOne];

      this.scale.AddHandle(controlOne);
    }
  }

  private IntervalCheckSize() {
    this.size = this.parentElement.offsetWidth;
    setInterval(() => {
      if (this.parentElement.offsetWidth !== this.size) {
        this.handleMaxMargin[this.handleMaxMargin.length - 1].SetMaxMargin(1);
        if (this.parentElement.offsetWidth > this.size){
          for (let i = this.handleArr.length-1; i >= 0; i--) {
            this.handleArr[i].SetCurrentMarginPercent(this.handleArr[i].GetSetSelectValue())
          }
        }
        else
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

  HideScale() {
    this.scale.HideScale();
  }

  ShowScale() {
    this.scale.ShowScale();
  }

}
