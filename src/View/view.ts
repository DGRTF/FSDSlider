import { IModelObserver } from '../Model/model';
import { IControlObserverCoordinate } from '../Control/control';


interface IView {
  showView(): void;
  hiddenView(): void;
  addClassesCss(classes: string): void;
}

class View implements IView, IModelObserver, IControlObserverCoordinate {
  private selectValueElement: HTMLElement;

  private parentElement: HTMLElement;

  private currentMargin: number;

  private orientation: boolean;

  constructor(parentElement: HTMLElement, orientation: boolean = true) {
    this.orientation = orientation;
    this.parentElement = parentElement;
    this.initialize();
  }

  private initialize() {
    // здесь создаётся див, потому что он может центрировать текст в отличие от input
    this.selectValueElement = document.createElement('div');
    if (this.orientation) this.selectValueElement.className += 'slider-view-horizontal';
    else this.selectValueElement.className += 'slider-view-vertical';
    this.parentElement.appendChild(this.selectValueElement);
  }

  getValue(selectValue: string) {
    this.selectValueElement.innerText = selectValue;
  }

  hiddenView() {
    this.selectValueElement.hidden = true;
  }

  showView() {
    this.selectValueElement.hidden = false;
  }

  setCoordinatePercent(coordinatePercent: number) {
    const isCoordinatePercentRange = coordinatePercent <= 1 && coordinatePercent >= 0;
    if (isCoordinatePercentRange) {
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

  addClassesCss(classes: string) {
    this.selectValueElement.className += classes;
  }



  // for tests

  getClasses(): string {
    return this.selectValueElement.className;
  }

}


export {
  IView,
  View,
}