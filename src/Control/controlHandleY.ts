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
    this.handle.classList.add("slider-foreground");
    this.mouseY = event.pageY;
    document.addEventListener('mousemove', this.move);
    this.handleY = this.handle.getBoundingClientRect().top;
  }

  private MoveBlock(event: MouseEvent) {
    this.currentMargin = this.handleY - this.mouseY + event.pageY;
    this.currentMargin -= this.parentElement.getBoundingClientRect().top;
    if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
      this.handle.style.top = `${this.currentMargin}px`;
      this.setSelectValue = this.currentMargin + this.handle.offsetHeight / 2;
      this.setSelectValue = 1 - this.setSelectValue / this.parentElement.offsetHeight;
    } else {
      if (this.currentMargin < this.minMargin) {
        this.handle.style.top = `${this.minMargin}px`;
        this.setSelectValue = 1 - (this.minMargin + this.handle.offsetHeight / 2) / this.parentElement.offsetHeight;
      } else {
        this.handle.style.top = `${this.maxMargin}px`;
        this.setSelectValue = 1 - (this.maxMargin + this.handle.offsetHeight / 2) / this.parentElement.offsetHeight;
      }
    }
    this.Notify();
  }

  private AddEventTouchMove(event: TouchEvent) {
    this.mouseY = event.targetTouches[0].pageY;
    document.addEventListener("touchmove", this.moveTouch);
    this.handleY = this.handle.getBoundingClientRect().top;
  }

  private MoveBlockTouch(event: TouchEvent) {
    this.currentMargin = this.handleY - this.mouseY + event.targetTouches[0].pageY;
    this.currentMargin -= this.parentElement.getBoundingClientRect().top;
    this.maxSpace = this.parentElement.offsetHeight;
    if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
      this.handle.style.top = `${this.currentMargin}px`;
      this.setSelectValue = this.parentElement.offsetHeight
        - this.currentMargin - this.handle.offsetHeight / 2;
      this.setSelectValue = (this.setSelectValue / this.maxSpace) * 100;
    } else {
      if (this.currentMargin < this.minMargin) {
        this.handle.style.left = `${this.minMargin}px`;
        this.setSelectValue = (this.minMargin + this.handle.offsetWidth / 2) / this.maxSpace * 100;
      } else {
        this.handle.style.left = `${this.maxMargin}px`;
        this.setSelectValue = (this.maxMargin + this.handle.offsetWidth / 2) / this.maxSpace * 100;
      }
    }
    this.Notify();
  }

  private move = this.MoveBlock.bind(this);

  private moveTouch = this.MoveBlockTouch.bind(this);

  SetCurrentMarginPercent(percent: number) {
    if (percent <= 1 && percent >= 0) {
      this.currentMargin = this.parentElement.offsetHeight * (1 - percent) - this.handle.offsetHeight / 2;
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.setSelectValue = percent;
        this.handle.style.top = `${this.currentMargin}px`;
      }
    }
    this.Notify();
  }

  SetMinMargin(minMargin: number) {
    if (minMargin <= 1 && minMargin >= 0) {
      this.minMargin = this.parentElement.offsetHeight * (1 - minMargin);
      this.minMargin = this.minMargin - this.handle.offsetHeight / 2;
    }
    this.handle.classList.remove("slider-foreground");
  }

  SetMaxMargin(maxMargin: number) {
    if (maxMargin <= 1 && maxMargin >= 0) {
      this.maxMargin = this.parentElement.offsetHeight * (1 - maxMargin);
      this.maxMargin = this.maxMargin - this.handle.offsetHeight / 2;
    }
    this.handle.classList.remove("slider-foreground");
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
