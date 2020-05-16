import { IHandle } from "./control";

interface SetMargin {
  SetCurrentMarginPercent(percent: number): void;
}


export default class ScaleSetMargin {
  constructor(parentElement: HTMLElement, orientation: boolean = true) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.Init();
  }

  private parentElement: HTMLElement;

  private orientation: boolean;

  private scale: HTMLElement;

  private movePercent: IHandle[] = [];

  private percent: number;

  private marginPercentArr: number[] = [];

  private Init() {
    this.scale = document.createElement("div");
    this.parentElement.appendChild(this.scale);
    this.AdddClasses();
    this.AdddHandle();
  }

  private AdddClasses() {
    if (this.orientation)
      this.scale.className = " slider-scaleSetMargin-horizontal";
    else
      this.scale.className = " slider-scaleSetMargin-vertical";
  }

  private AdddHandle() {
    this.scale.addEventListener("mousedown", this.PercentInit.bind(this));
  }

  private PercentInit(event: MouseEvent) {
    if (this.orientation)
      this.percent = (event.pageX - this.parentElement.getBoundingClientRect().left) / this.parentElement.offsetWidth * 100;
    else
      this.percent = (event.pageY - this.parentElement.getBoundingClientRect().top) / this.parentElement.offsetHeight * 100;

    this.SearchNear();
  }

  private SearchNear() {
    this.movePercent.forEach((el, item) => {
      this.marginPercentArr[item] = Math.abs(el.GetSetSelectValue() - this.percent);
    });

    this.marginPercentArr.sort(this.Compare);
    this.Move();
  }

  private Compare(a: number, b: number) {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
  }

  private Move() {
    this.movePercent.forEach(el => {
      if (Math.abs(el.GetSetSelectValue() - this.percent) === this.marginPercentArr[0])
        el.SetCurrentMarginPercent(this.percent);
    });
  }

  AddHandle(handle: IHandle) {
    this.movePercent.push(handle);
  }
}