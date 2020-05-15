import {
  IHandle, IControlObservable, IControlObserverCoordinate, IControlMax, IControlMin,
} from './control';


export default class HandleX implements IControlObservable, IHandle, IControlMin, IControlMax {
  private handle: HTMLElement;

  private parentElement: HTMLElement;

  private maxSpace: number;

  private currentMargin: number;

  private mouseX: number;

  private handleX: number;

  private minMargin: number;

  private maxMargin: number;

  private setSelectValue: number;

  private observer: IControlObserverCoordinate[];

  constructor(parentElement: HTMLElement,
    controlObserver: IControlObserverCoordinate[] = []) {
    this.parentElement = parentElement;
    this.observer = controlObserver;

    this.init();
    this.minMargin = 0 - this.handle.offsetWidth / 2;
    this.maxMargin = -this.handle.offsetWidth / 2 + this.parentElement.offsetWidth;
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
    this.mouseX = event.pageX;
    document.addEventListener('mousemove', this.move);
    this.handleX = this.handle.getBoundingClientRect().left;
  }

  private MoveBlock(event: MouseEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.pageX;
    this.currentMargin -= this.parentElement.getBoundingClientRect().left;
    this.maxSpace = this.parentElement.offsetWidth;
    this.setSelectValue = (this.currentMargin + this.handle.offsetWidth / 2) / this.maxSpace * 100;
    if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
      this.handle.style.left = `${this.currentMargin}px`;
      this.setSelectValue = (this.currentMargin + this.handle.offsetWidth / 2) / this.maxSpace * 100;
    }
    this.Notify();
  }

  private AddEventTouchMove(event: TouchEvent) {
    this.mouseX = event.targetTouches[0].pageX;
    document.addEventListener("touchmove", this.moveTouch);
    this.handleX = this.handle.getBoundingClientRect().left;
  }

  private MoveBlockTouch(event: TouchEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.targetTouches[0].pageX;
    this.currentMargin -= this.parentElement.getBoundingClientRect().left;
    this.maxSpace = this.parentElement.offsetWidth;
    if (this.currentMargin <= this.maxSpace
      && this.currentMargin >= 0 - this.handle.offsetWidth / 2) {
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.handle.style.left = `${this.currentMargin}px`;
        this.setSelectValue = this.currentMargin + this.handle.offsetWidth / 2;
        this.setSelectValue = (this.setSelectValue / this.maxSpace) * 100;
        this.Notify();
      }
    }
  }

  private move = this.MoveBlock.bind(this);

  private moveTouch = this.MoveBlockTouch.bind(this);

  SetCurrentMarginPercent(percent: number) {
    if (percent <= 100 && percent >= 0) {
      this.maxSpace = this.parentElement.offsetWidth;
      this.currentMargin = this.maxSpace * percent;
      this.currentMargin = this.currentMargin / 100 - this.handle.offsetWidth / 2;
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.setSelectValue = percent;
        this.handle.style.left = `${this.currentMargin}px`;
      }
    }
    this.Notify();
  }

  SetMinMargin(minMargin: number) {
    if (minMargin <= 100 && minMargin >= 0) {
      this.minMargin = (this.parentElement.offsetWidth * minMargin);
      this.minMargin = this.minMargin / 100 - this.handle.offsetWidth / 2;
    }
  }

  SetMaxMargin(maxMargin: number) {
    if (maxMargin <= 100 && maxMargin >= 0) {
      this.maxMargin = (this.parentElement.offsetWidth * maxMargin);
      this.maxMargin = this.maxMargin / 100 - this.handle.offsetWidth / 2;
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

  GetHandleStyleLeft(): string {
    return this.handle.style.left;
  }

  GetHandleOffsetWidth(): number {
    return this.handle.offsetWidth;
  }

  GetObserver(): IControlObserverCoordinate[] {
    const observer: IControlObserverCoordinate[] = [];
    this.observer.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }
}
