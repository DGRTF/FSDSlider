import { IValue } from "../Model/model";


export default class ScaleValue {
  constructor(parentElement: HTMLElement, model: IValue,
    orientation: boolean = true
  ) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.model = model;
    this.initialize();
  }

  private parentElement: HTMLElement;

  private orientation: boolean;

  private valuesContainer: HTMLElement;

  private minValue: HTMLElement;

  private middleValue: HTMLElement;

  private maxValue: HTMLElement;

  private model: IValue;

  private initialize() {
    this.createElements();
    this.addClasses();
    this.addContentHTML();
    this.setValues();
  }

  private createElements() {
    this.valuesContainer = document.createElement("div");
    this.minValue = document.createElement("div");
    this.middleValue = document.createElement("div");
    this.maxValue = document.createElement("div");
  }

  private addClasses() {
    if (this.orientation) {
      this.valuesContainer.classList.add("slider-view-scale-value");

      this.minValue.classList.add("slider-view-scale-values");
      this.minValue.classList.add("slider-view-scale-min-value");

      this.middleValue.classList.add("slider-view-scale-values");
      this.middleValue.classList.add("slider-view-scale-central-value");

      this.maxValue.classList.add("slider-view-scale-values");
      this.maxValue.classList.add("slider-view-scale-max-value");
    } else {
      this.valuesContainer.classList.add("slider-view-scale-value-vertical");

      this.minValue.classList.add("slider-view-scale-values");
      this.minValue.classList.add("slider-view-scale-min-value-vertical");

      this.middleValue.classList.add("slider-view-scale-values");
      this.middleValue.classList.add("slider-view-scale-central-value");

      this.maxValue.classList.add("slider-view-scale-values");
      this.maxValue.classList.add("slider-view-scale-max-value-vertical");
    }
  }

  private addContentHTML() {
    this.parentElement.appendChild(this.valuesContainer);
    this.valuesContainer.appendChild(this.minValue);
    this.valuesContainer.appendChild(this.middleValue);
    this.valuesContainer.appendChild(this.maxValue);
  }

  setValues() {
    if (this.model) {
      this.minValue.innerText = this.model.getValueFromPercent(0);
      this.middleValue.innerText = this.model.getValueFromPercent(.5);
      this.maxValue.innerText = this.model.getValueFromPercent(1);
    }
  }

  // сделано, что бы предать гибкости коду
  // таким образом можно передать другую модель этому объекту без необходимости создавать новый экземпляр этого класса
  setIValue(model: IValue) {
    this.model = model;
    this.setValues();
  }

  hideScale() {
    this.valuesContainer.classList.add("slider-view-hide");
  }

  showScale() {
    this.valuesContainer.classList.remove("slider-view-hide");
  }



  // fot tests

  getClassesValueContainer(): string {
    return this.valuesContainer.className;
  }

  getIValue(): IValue {
    return this.model;
  }

  getSettingValue() {
    return this.minValue.innerText + " " + this.middleValue.innerText + " " + this.maxValue.innerText;
  }
}