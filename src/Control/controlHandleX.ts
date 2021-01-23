import {
  IHandle,
  IControlObservable,
  IControlObserverCoordinate,
  IControlMax,
  IControlMin,
} from './control';


export default class HandleX implements IControlObservable, IHandle, IControlMin, IControlMax {
  private handle: HTMLElement;

  private parentElement: HTMLElement;

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
    this.Create();
    this.AddClasses();
    this.AddContentHtml();
    this.AddListener();
  }

  private Create() {
    this.handle = document.createElement('div');
  }

  private AddClasses() {
    this.parentElement.className += ' slider-parent-element';
    this.handle.className += 'slider-handle';
  }

  private AddContentHtml() {
    this.parentElement.appendChild(this.handle);
  }

  private AddListener() {
    this.handle.addEventListener('mousedown', this.AddEventMouseMove.bind(this));
    this.handle.addEventListener("touchstart", this.AddEventTouchMove.bind(this));
    document.addEventListener('mouseup', this.MouseUpListener.bind(this));
  }

  private MouseUpListener() {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  private TouchCancelListener() {
    document.removeEventListener('touchmove', this.moveTouch);
    document.removeEventListener('touchend', this.TouchCancelListener.bind(this));
  }

  private AddEventMouseMove(event: MouseEvent) {
    this.handle.classList.add("slider-foreground");
    this.mouseX = event.clientX;
    document.addEventListener('mousemove', this.mouseMoveHandler);
    this.handleX = this.handle.getBoundingClientRect().left;
  }

  private MouseMoveHandler(event: MouseEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.clientX;
    this.currentMargin -= this.parentElement.getBoundingClientRect().left;
    this.MoveHandle();
  }

  private MoveHandle() {
    const isCurrentMarginRange = this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin;

    if (isCurrentMarginRange) {
      this.handle.style.left = `${this.currentMargin}px`;
      this.setSelectValue = (this.currentMargin + this.handle.offsetWidth / 2) / this.parentElement.offsetWidth;
    } else {
      if (this.currentMargin < this.minMargin) {
        this.handle.style.left = `${this.minMargin}px`;
        this.setSelectValue = (this.minMargin + this.handle.offsetWidth / 2) / this.parentElement.offsetWidth;
      } else {
        this.handle.style.left = `${this.maxMargin}px`;
        this.setSelectValue = (this.maxMargin + this.handle.offsetWidth / 2) / this.parentElement.offsetWidth;
      }
    }
    this.Notify();
  }

  private AddEventTouchMove(event: TouchEvent) {
    this.mouseX = event.targetTouches[0].pageX;
    document.addEventListener("touchmove", this.moveTouch);
    document.addEventListener('touchend', this.TouchCancelListener.bind(this));
    this.handleX = this.handle.getBoundingClientRect().left;
  }

  private MoveBlockTouch(event: TouchEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.targetTouches[0].pageX;
    this.currentMargin -= this.parentElement.getBoundingClientRect().left;
    this.MoveHandle();
  }

  private mouseMoveHandler = this.MouseMoveHandler.bind(this);

  private moveTouch = this.MoveBlockTouch.bind(this);

  SetCurrentMarginPercent(percent: number) {
    const isPercentRange = percent <= 1 && percent >= 0;

    if (isPercentRange) {
      this.currentMargin = this.parentElement.offsetWidth * percent - this.handle.offsetWidth / 2;
      const isCurrentMarginRange = this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin;

      if (isCurrentMarginRange) {
        this.setSelectValue = percent;
        this.handle.style.left = `${this.currentMargin}px`;
        this.Notify();
      }
    }
  }

  SetMinMargin(minMargin: number) {
    const isMinMarginRange = minMargin <= 1 && minMargin >= 0;

    if (isMinMarginRange) {
      this.minMargin = this.parentElement.offsetWidth * minMargin - this.handle.offsetWidth / 2;
    }
    this.handle.classList.remove("slider-foreground");
  }

  SetMaxMargin(maxMargin: number) {
    const isMaxMarginRange = maxMargin <= 1 && maxMargin >= 0;

    if (isMaxMarginRange) {
      this.maxMargin = this.parentElement.offsetWidth * maxMargin - this.handle.offsetWidth / 2;
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
    if (this.observer) {
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

  GetObserver(): IControlObserverCoordinate[] {
    const observer: IControlObserverCoordinate[] = [];
    this.observer.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }
}
