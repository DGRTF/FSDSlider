import { IModelObserver } from '../Model/model';
import { IControlObserverCoordinate } from '../Control/control';


interface IView {
  ShowView(): void;
  HiddenView(): void;
  AddClassesCss(classes: string): void;
}

class View implements IView, IModelObserver, IControlObserverCoordinate {
  private selectValueElement: HTMLElement;

  private parentElement: HTMLElement;

  private currentMargin: number;

  private orientation: boolean;

  constructor(parentElement: HTMLElement, orientation: boolean = true) {
    this.orientation = orientation;
    this.parentElement = parentElement;
    this.init();
  }

  private init() {
    // здесь создаётся див, потому что он может центрировать текст в отличие от input
    this.selectValueElement = document.createElement('div');
    if (this.orientation) this.selectValueElement.className += 'slider-view-horizontal';
    else this.selectValueElement.className += 'slider-view-vertical';
    this.parentElement.appendChild(this.selectValueElement);
  }

  GetValue(selectValue: string) {
    this.selectValueElement.innerText = selectValue;
  }

  HiddenView() {
    this.selectValueElement.hidden = true;
  }

  ShowView() {
    this.selectValueElement.hidden = false;
  }

  SetCoordinatePercent(coordinatePercent: number) {
    if (coordinatePercent <= 1 && coordinatePercent >= 0) {
      if (this.orientation) {
        this.currentMargin = this.parentElement.offsetWidth * coordinatePercent;
        this.currentMargin -= this.selectValueElement.offsetWidth / 2;
        this.selectValueElement.style.left = `${this.currentMargin}px`;
      } else {
        this.currentMargin = this.parentElement.offsetHeight;
        this.currentMargin *= (1 - coordinatePercent);
        this.currentMargin -= this.selectValueElement.offsetHeight / 2;
        this.selectValueElement.style.top = `${this.currentMargin}px`;
      }
    }
  }

  AddClassesCss(classes: string) {
    this.selectValueElement.className += classes;
  }



  // for tests

  GetClasses(): string {
    return this.selectValueElement.className;
  }

}


export {
  IView,
  View,
}