import { IHandle, IControlObservable, IControlObserverCoordinate, IControlMax, IControlMin } from "./control";


export class HandleX implements IControlObservable, IHandle, IControlMin, IControlMax {
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

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.move);
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
    if (this.currentMargin <= this.maxSpace 
      && this.currentMargin >= 0 - this.handle.offsetWidth / 2) {
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.handle.style.left = `${this.currentMargin}px`;
        this.setSelectValue = (this.currentMargin + this.handle.offsetWidth / 2);
        this.setSelectValue = (this.setSelectValue / this.maxSpace) * 100;
        this.Notify();
      }
    }
  }

  private move = this.MoveBlock.bind(this);

  SetCurrentMarginPercent(percent: number) {
    if (percent <= 100 && percent >= 0) {
      this.maxSpace = this.parentElement.offsetWidth;
      this.currentMargin = (this.maxSpace * percent) / 100 - this.handle.offsetWidth / 2;
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.setSelectValue = percent;
        this.handle.style.left = `${this.currentMargin}px`;
        this.Notify();
      }
    }
  }

  SetMinMargin(minMargin: number) {
    this.minMargin = this.parentElement.offsetWidth * minMargin / 100 - this.handle.offsetWidth / 2;
  }

  SetMaxMargin(maxMargin: number) {
    this.maxMargin = this.parentElement.offsetWidth * maxMargin / 100 - this.handle.offsetWidth / 2;
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



  //get values for tests
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
    let observer: IControlObserverCoordinate[] = [];
    this.observer.forEach((el, index) => {
      observer[index] = el;
    });
    return observer;
  }
}