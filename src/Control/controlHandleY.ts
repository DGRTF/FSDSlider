import {
  IHandle, IControlObservable, IControlObserverCoordinate, IControlMax, IControlMin,
} from './control';


export default class HandleY implements IControlObservable, IHandle, IControlMin, IControlMax {
  private handle: HTMLElement;

  private parentElement: HTMLElement;

  private maxSpace: number;

  private currentMargin: number;

  private mouseY: number;

  private handleY: number;

  private minMargin: number;

  private maxMargin: number;

  private setSelectValue: number;

  private observer: IControlObserverCoordinate[];

  constructor(parentElement: HTMLElement,
    controlObserver: IControlObserverCoordinate[] = []) {
    this.parentElement = parentElement;
    this.observer = controlObserver;

    this.init();
    this.minMargin = 0 - this.handle.offsetHeight / 2;
    this.maxMargin = -this.handle.offsetHeight / 2 + this.parentElement.offsetHeight;
  }

  private init() {
    this.handle = document.createElement('div');

    this.AddClasses();
    this.AddContentHtml();

    this.handle.addEventListener('mousedown', this.AddEventMouseMove.bind(this));
    this.handle.addEventListener("touchstart", this.AddEventTouchMove.bind(this));

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.move);
    });

    document.addEventListener('touchcancel', () => {
      alert("touch end");
      document.removeEventListener('touchmove', this.moveTouch);
    });
  }

  private AddClasses() {
    this.parentElement.className += ' slider-parent-element';
    this.handle.className += 'slider-handle';
  }

  private AddContentHtml() {
    this.parentElement.appendChild(this.handle);
  }

  private AddEventMouseMove(event: MouseEvent) {
    this.mouseY = event.pageY;
    document.addEventListener('mousemove', this.move);
    this.handleY = this.handle.getBoundingClientRect().top;
  }

  private MoveBlock(event: MouseEvent) {
    this.currentMargin = this.handleY - this.mouseY + event.pageY;
    this.currentMargin -= this.parentElement.getBoundingClientRect().top;
    this.maxSpace = this.parentElement.offsetHeight;
    if (this.currentMargin <= this.maxSpace - this.handle.offsetHeight / 2
      && this.currentMargin >= 0 - this.handle.offsetHeight / 2) {
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.handle.style.top = `${this.currentMargin}px`;
        this.setSelectValue = this.parentElement.offsetHeight
          - this.currentMargin - this.handle.offsetHeight / 2;
        this.setSelectValue = (this.setSelectValue / this.maxSpace) * 100;
        this.Notify();
      }
    }
  }

  private AddEventTouchMove(event: TouchEvent){
    this.mouseY = event.targetTouches[0].pageY;
    document.addEventListener("touchmove", this.moveTouch);
    this.handleY = this.handle.getBoundingClientRect().top;
  }

  private MoveBlockTouch(event: TouchEvent) {
    this.currentMargin = this.handleY - this.mouseY + event.targetTouches[0].pageY;
    this.currentMargin -= this.parentElement.getBoundingClientRect().top;
    this.maxSpace = this.parentElement.offsetHeight;
    if (this.currentMargin <= this.maxSpace - this.handle.offsetHeight / 2
      && this.currentMargin >= 0 - this.handle.offsetHeight / 2) {
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.handle.style.top = `${this.currentMargin}px`;
        this.setSelectValue = this.parentElement.offsetHeight
          - this.currentMargin - this.handle.offsetHeight / 2;
        this.setSelectValue = (this.setSelectValue / this.maxSpace) * 100;
        this.Notify();
      }
    }
  }

  private move = this.MoveBlock.bind(this);

  private moveTouch = this.MoveBlockTouch.bind(this);

  SetCurrentMarginPercent(percent: number) {
    if (percent <= 100 && percent >= 0) {
      this.maxSpace = this.parentElement.offsetHeight;
      this.currentMargin = (this.maxSpace * (100 - percent)) / 100 - this.handle.offsetHeight / 2;
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.setSelectValue = percent;
        this.handle.style.top = `${this.currentMargin}px`;
      }
    }
    this.Notify();
  }

  SetMinMargin(minMargin: number) {
    if (minMargin <= 100 && minMargin >= 0) {
      this.minMargin = this.parentElement.offsetHeight * (100 - minMargin);
      this.minMargin = this.minMargin / 100 - this.handle.offsetHeight / 2;
    }
  }

  SetMaxMargin(maxMargin: number) {
    if (maxMargin <= 100 && maxMargin >= 0) {
      this.maxMargin = this.parentElement.offsetHeight * (100 - maxMargin);
      this.maxMargin = this.maxMargin / 100 - this.handle.offsetHeight / 2;
    }
  }

  AddObserver(controlObserver: IControlObserverCoordinate) {
    this.observer.push(controlObserver);
  }

  DeleteObserver(controlObserver: IControlObserverCoordinate) {
    const index = this.observer.indexOf(controlObserver);
    if (index > -1) {
      this.observer.splice(index, 1);
    }
  }

  Notify() {
    if (this.observer !== null || this.observer !== undefined) {
      this.observer.forEach((el) => {
        el.SetCoordinatePercent(this.setSelectValue);
      });
    }
    // console.warn(this.setSelectValue);
  }

  GetSetSelectValue(): number {
    return this.setSelectValue;
  }


  // get values for tests
  GetMinMargin(): number {
    return this.minMargin;
  }

  GetMaxMargin(): number {
    return this.maxMargin;
  }

  GetHandleStyleTop(): string {
    return this.handle.style.top;
  }

  GetHandleOffsetHeight(): number {
    return this.handle.offsetHeight;
  }

  GetObserver(): IControlObserverCoordinate[] {
    const observer: IControlObserverCoordinate[] = [];
    this.observer.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }
}
