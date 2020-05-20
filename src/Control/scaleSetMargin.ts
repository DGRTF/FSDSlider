import { IHandle } from "./control";

export default class ScaleSetMargin {
  constructor(parentElement: HTMLElement, orientation: boolean = true) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.Init();
  }

  private parentElement: HTMLElement;

  private orientation: boolean;

  private scale: HTMLElement;

  private lineFirst: HTMLElement;

  private centralLine: HTMLElement;

  private lineLast: HTMLElement;

  private movePercent: IHandle[] = [];

  private percent: number;

  private marginPercentArr: number[] = [];

  private Init() {
    this.Create();
    this.AddContent();
    this.AddClasses();
    this.AddHandleClick();
  }

  private Create() {
    this.scale = document.createElement("div");
    this.lineFirst = document.createElement("div");
    this.centralLine = document.createElement("div");
    this.lineLast = document.createElement("div");
  }

  private AddContent() {
    this.scale.appendChild(this.lineFirst);
    this.scale.appendChild(this.centralLine);
    this.scale.appendChild(this.lineLast);
    this.parentElement.appendChild(this.scale);
  }

  private AddClasses() {
    if (this.orientation) {
      this.scale.className = " slider-scaleSetMargin-horizontal";
      this.lineFirst.className = " slider-scaleSetMargin-line"
      this.centralLine.className = " slider-scaleSetMargin-central-line"
      this.lineLast.className = " slider-scaleSetMargin-line"
    } else {
      this.scale.className = " slider-scaleSetMargin-vertical";
      this.lineFirst.className = " slider-scaleSetMargin-line-vertical"
      this.centralLine.className = " slider-scaleSetMargin-central-line-vertical"
      this.lineLast.className = " slider-scaleSetMargin-line-vertical"
    }
  }

  private AddHandleClick() {
    this.scale.addEventListener("click", this.PercentInit.bind(this));
  }

  private PercentInit(event: MouseEvent) {
    if (this.orientation)
      this.percent = (event.clientX - this.parentElement.getBoundingClientRect().left) / this.parentElement.offsetWidth;
    else
      this.percent = 1 - (event.clientY - this.parentElement.getBoundingClientRect().top) / this.parentElement.offsetHeight;

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

  HideScale() {
    this.scale.classList.add("slider-scaleSetMargin-hidden");
  }

  ShowScale() {
    this.scale.classList.remove("slider-scaleSetMargin-hidden");
  }



  // for tests

  GetMovePercent(): number {
    return this.movePercent.length;
  }

  GetScaleClass(): string{
    return this.scale.className;
  }

}