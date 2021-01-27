import {
  IHandle,
  IControlObservable,
  IControlObserverCoordinate,
  IControlMax,
  IControlMin,
} from './control';


export default class HandleY implements IControlObservable, IHandle, IControlMin, IControlMax {
  private handle: HTMLElement;

  private parentElement: HTMLElement;

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

    this.initialize();
  }

  private initialize() {
    this.create();
    this.addClasses();
    this.addContentHtml();
    this.addListener();
    this.setMargins();
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

  private addListener() {
    this.handle.addEventListener('mousedown', this.handleHandleDivMouseDown.bind(this));
    this.handle.addEventListener("touchstart", this.handleHandleDivTouchStart.bind(this));
    document.addEventListener('mouseup', this.handleSpaceDocumentMouseUp.bind(this));
  }

  private handleSpaceDocumentMouseUp() {
    document.removeEventListener('mousemove', this.handleSpaceDocumentMouseMove);
  }

  private handleSpaceDocumentTouchEnd() {
    document.removeEventListener('touchmove', this.handleSpaceDocumentTouchMove);
    document.removeEventListener('touchend', this.handleSpaceDocumentTouchEnd.bind(this));
  }

  private handleHandleDivMouseDown(event: MouseEvent) {
    this.handle.classList.add("slider-foreground");
    this.mouseY = event.pageY;
    document.addEventListener('mousemove', this.handleSpaceDocumentMouseMove);
    this.handleY = this.handle.getBoundingClientRect().top;
  }

  private handleMoveBlock(event: MouseEvent) {
    this.currentMargin = this.handleY - this.mouseY + event.pageY;
    this.currentMargin -= this.parentElement.getBoundingClientRect().top;
    this.handleMove();
  }

  private handleMove() {
    const isCurrentMarginRange = this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin;

    if (isCurrentMarginRange) {
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
    this.notify();
  }

  private handleHandleDivTouchStart(event: TouchEvent) {
    this.mouseY = event.targetTouches[0].pageY;
    document.addEventListener("touchmove", this.handleSpaceDocumentTouchMove);
    document.addEventListener('touchend', this.handleSpaceDocumentTouchEnd.bind(this));
    this.handleY = this.handle.getBoundingClientRect().top;
  }

  private handleMoveBlockTouch(event: TouchEvent) {
    this.currentMargin = this.handleY - this.mouseY + event.targetTouches[0].pageY;
    this.currentMargin -= this.parentElement.getBoundingClientRect().top;
    this.handleMove();
  }

  private handleSpaceDocumentMouseMove = this.handleMoveBlock.bind(this);

  private handleSpaceDocumentTouchMove = this.handleMoveBlockTouch.bind(this);

  setMargins(){
    this.minMargin = 0 - this.handle.offsetHeight / 2;
    this.maxMargin = -this.handle.offsetHeight / 2 + this.parentElement.offsetHeight;
  }

  setCurrentMarginPercent(percent: number) {
    const isPercentRange = percent <= 1 && percent >= 0;

    if (isPercentRange) {
      this.currentMargin = this.parentElement.offsetHeight * (1 - percent) - this.handle.offsetHeight / 2;
      const isCurrentMarginRange = this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin;

      if (isCurrentMarginRange) {
        this.setSelectValue = percent;
        this.handle.style.top = `${this.currentMargin}px`;
      }
    }
    this.notify();
  }

  setMinMargin(minMargin: number) {
    const isMinMarginRange = minMargin <= 1 && minMargin >= 0;

    if (isMinMarginRange) {
      this.minMargin = this.parentElement.offsetHeight * (100 - minMargin * 100) / 100; // сложное выражение из-за неточности вычислений
      this.minMargin = this.minMargin - this.handle.offsetHeight / 2;
    }
    this.handle.classList.remove("slider-foreground");
  }

  setMaxMargin(maxMargin: number) {
    const isMaxMarginRange = maxMargin <= 1 && maxMargin >= 0;

    if (isMaxMarginRange) {
      this.maxMargin = this.parentElement.offsetHeight * (1 - maxMargin);
      this.maxMargin = this.maxMargin - this.handle.offsetHeight / 2;
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

  getHandleStyleTop(): string {
    return this.handle.style.top;
  }

  getObservers(): IControlObserverCoordinate[] {
    const observer: IControlObserverCoordinate[] = [];
    this.observer.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }
}
