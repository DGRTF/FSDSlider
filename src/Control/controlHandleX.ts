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

    this.initialize();
    this.minMargin = 0 - this.handle.offsetWidth / 2;
    this.maxMargin = -this.handle.offsetWidth / 2 + this.parentElement.offsetWidth;
  }

  private initialize() {
    this.create();
    this.addClasses();
    this.addContentHtml();
    this.addListeners();
  }

  private create() {
    this.handle = document.createElement('div');
  }

  private addClasses() {
    this.parentElement.className += ' slider-parent-element';
    this.handle.className += 'slider-handle';
  }

  private addContentHtml() {
    this.parentElement.appendChild(this.handle);
  }

  private addListeners() {
    this.handle.addEventListener('mousedown', this.handleAddEventMouseMove.bind(this));
    this.handle.addEventListener("touchstart", this.handleAddEventTouchMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUpListener.bind(this));
  }

  private handleMouseUpListener() {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  private handleTouchCancelListener() {
    document.removeEventListener('touchmove', this.moveTouch);
    document.removeEventListener('touchend', this.handleTouchCancelListener.bind(this));
  }

  private handleAddEventMouseMove(event: MouseEvent) {
    this.handle.classList.add("slider-foreground");
    this.mouseX = event.clientX;
    document.addEventListener('mousemove', this.mouseMoveHandler);
    this.handleX = this.handle.getBoundingClientRect().left;
  }

  private handleMouseMoveHandler(event: MouseEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.clientX;
    this.currentMargin -= this.parentElement.getBoundingClientRect().left;
    this.handleMove();
  }

  private handleMove() {
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
    this.notify();
  }

  private handleAddEventTouchMove(event: TouchEvent) {
    this.mouseX = event.targetTouches[0].pageX;
    document.addEventListener("touchmove", this.moveTouch);
    document.addEventListener('touchend', this.handleTouchCancelListener.bind(this));
    this.handleX = this.handle.getBoundingClientRect().left;
  }

  private handleMoveBlockTouch(event: TouchEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.targetTouches[0].pageX;
    this.currentMargin -= this.parentElement.getBoundingClientRect().left;
    this.handleMove();
  }

  private mouseMoveHandler = this.handleMouseMoveHandler.bind(this);

  private moveTouch = this.handleMoveBlockTouch.bind(this);

  setCurrentMarginPercent(percent: number) {
    const isPercentRange = percent <= 1 && percent >= 0;

    if (isPercentRange) {
      this.currentMargin = this.parentElement.offsetWidth * percent - this.handle.offsetWidth / 2;
      const isCurrentMarginRange = this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin;

      if (isCurrentMarginRange) {
        this.setSelectValue = percent;
        this.handle.style.left = `${this.currentMargin}px`;
        this.notify();
      }
    }
  }

  setMinMargin(minMargin: number) {
    const isMinMarginRange = minMargin <= 1 && minMargin >= 0;

    if (isMinMarginRange) {
      this.minMargin = this.parentElement.offsetWidth * minMargin - this.handle.offsetWidth / 2;
    }
    this.handle.classList.remove("slider-foreground");
  }

  setMaxMargin(maxMargin: number) {
    const isMaxMarginRange = maxMargin <= 1 && maxMargin >= 0;

    if (isMaxMarginRange) {
      this.maxMargin = this.parentElement.offsetWidth * maxMargin - this.handle.offsetWidth / 2;
    }
    this.handle.classList.remove("slider-foreground");
  }

  addObserver(controlObserver: IControlObserverCoordinate) {
    this.observer.push(controlObserver);
  }

  deleteObserver(controlObserver: IControlObserverCoordinate) {
    const index = this.observer.indexOf(controlObserver);
    
    if (index > -1) {
      this.observer.splice(index, 1);
    }
  }

  notify() {
    if (this.observer) {
      this.observer.forEach((el) => {
        el.setCoordinatePercent(this.setSelectValue);
      });
    }
  }

  getSetSelectValue(): number {
    return this.setSelectValue;
  }



  // get values for tests
  getMinMargin(): number {
    return this.minMargin;
  }

  getMaxMargin(): number {
    return this.maxMargin;
  }

  getHandleStyleLeft(): string {
    return this.handle.style.left;
  }

  getObserver(): IControlObserverCoordinate[] {
    const observer: IControlObserverCoordinate[] = [];
    this.observer.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }
}
