import { IValue } from "../Model/model";


export default class ScaleValue {
  constructor(parentElement: HTMLElement, model: IValue,
    orientation: boolean = true
  ) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.model = model;
    this.Init();
  }

  private parentElement: HTMLElement;

  private orientation: boolean;

  private valuesContainer: HTMLElement;

  private minValue: HTMLElement;

  private middleValue: HTMLElement;

  private maxValue: HTMLElement;

  private model: IValue;

  private Init() {
    this.CreateElement();
    this.AddClasses();
    this.AddContentHTML();
    this.SetValues();

  }

  private CreateElement() {
    this.valuesContainer = document.createElement("div");
    this.minValue = document.createElement("div");
    this.middleValue = document.createElement("div");
    this.maxValue = document.createElement("div");
  }

  private AddClasses() {
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

  private AddContentHTML() {
    this.parentElement.appendChild(this.valuesContainer);
    this.valuesContainer.appendChild(this.minValue);
    this.valuesContainer.appendChild(this.middleValue);
    this.valuesContainer.appendChild(this.maxValue);
  }

  SetValues() {
    if (this.model) {
      this.minValue.innerText = this.model.ValueInPercent(0);
      this.middleValue.innerText = this.model.ValueInPercent(.5);
      this.maxValue.innerText = this.model.ValueInPercent(1);
    }
  }

  // сделано, что бы предать гибкости коду
  // таким образом можно передать другую модель этому объекту без необходимости создавать новый экземпляр этого класса
  SetIValue(model: IValue) {
    this.model = model;
    this.SetValues();
  }

  HideScale() {
    this.valuesContainer.classList.add("slider-view-hide");
  }

  ShowScale() {
    this.valuesContainer.classList.remove("slider-view-hide");
  }



  // fot tests

  GetClassesValueContainer(): string {
    return this.valuesContainer.className;
  }

  GetIValue(): IValue {
    return this.model;
  }

  GetSettingValue() {
    return this.minValue.innerText + " " + this.middleValue.innerText + " " + this.maxValue.innerText;
  }
}