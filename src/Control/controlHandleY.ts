import {IHandle, IControlObservable, IControlObserverCoordinate, IControlMax, IControlMin} from "./control";



export class HandleY implements IControlObservable, IHandle, IControlMin, IControlMax {
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
    this.mouseY = event.pageY;
    document.addEventListener('mousemove', this.move);
    this.handleY = this.handle.getBoundingClientRect().top;
  }

  private MoveBlock(event: MouseEvent) {
    this.currentMargin = this.handleY - this.mouseY + event.pageY;
    this.currentMargin -= this.parentElement.getBoundingClientRect().top;
    this.maxSpace = this.parentElement.offsetHeight;
    if (this.currentMargin <= this.maxSpace
      && this.currentMargin >= 0 - this.handle.offsetHeight / 2) {
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.handle.style.top = `${this.currentMargin}px`;
        this.setSelectValue = this.currentMargin + this.handle.offsetHeight / 2;
        this.setSelectValue = (this.setSelectValue / this.maxSpace) * 100;
        this.Notify();
      }
    }
  }

  private move = this.MoveBlock.bind(this);


  SetCurrentMarginPercent(percent: number) {
    if (percent <= 100 && percent >= 0) {
      this.maxSpace = this.parentElement.offsetHeight;
      this.currentMargin = (this.maxSpace * percent) / 100 - this.handle.offsetHeight / 2;
      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.setSelectValue = percent;
        this.handle.style.top = `${this.currentMargin}px`;
        this.Notify();
      }
    }
  }

  // SetCurrentMarginPercent111111111(percent: number) {
  //   if (percent <= 100 && percent >= 0) {
  //     this.maxSpace = this.parentElement.offsetWidth;
  //     this.currentMargin = (this.maxSpace * percent) / 100 - this.handle.offsetWidth / 2;
  //     if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
  //       this.setSelectValue = percent;
  //       this.handle.style.left = `${this.currentMargin}px`;
  //       this.Notify();
  //     }
  //   }
  // }


  SetMinMargin(minMargin: number) {
    this.minMargin = this.parentElement.offsetHeight * minMargin / 100 - this.handle.offsetHeight / 2;
  }

  SetMaxMargin(maxMargin: number) {
    this.maxMargin = this.parentElement.offsetHeight * maxMargin / 100 - this.handle.offsetHeight / 2;
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
  
    GetHandleStyleTop(): string {
      return this.handle.style.top;
    }
  
    GetHandleOffsetHeight(): number {
      return this.handle.offsetHeight;
    }
  
    GetObserver(): IControlObserverCoordinate[] {
      let observer: IControlObserverCoordinate[] = [];
      this.observer.forEach((el, index) => {
        observer[index] = el;
      });
      return observer;
    }
}