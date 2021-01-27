import { IHandle } from "./control";

export default class ScaleSetMargin {
  constructor(parentElement: HTMLElement, orientation: boolean = true) {
    this.parentElement = parentElement;
    this.orientation = orientation;
    this.initialize();
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

  private initialize() {
    this.create();
    this.addContent();
    this.addClasses();
    this.addHandleClick();
  }

  private create() {
    this.scale = document.createElement("div");
    this.lineFirst = document.createElement("div");
    this.centralLine = document.createElement("div");
    this.lineLast = document.createElement("div");
  }

  private addContent() {
    this.scale.appendChild(this.lineFirst);
    this.scale.appendChild(this.centralLine);
    this.scale.appendChild(this.lineLast);
    this.parentElement.appendChild(this.scale);
  }

  private addClasses() {
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

  private addHandleClick() {
    this.scale.addEventListener("click", this.handleScaleDivClick.bind(this));
  }

  private handleScaleDivClick(event: MouseEvent) {
    if (this.orientation)
      this.percent = (event.clientX - this.parentElement.getBoundingClientRect().left) / this.parentElement.offsetWidth;
    else
      this.percent = 1 - (event.clientY - this.parentElement.getBoundingClientRect().top) / this.parentElement.offsetHeight;

    this.searchNear();
  }

  private searchNear() {
    this.movePercent.forEach((el, item) => {
      this.marginPercentArr[item] = Math.abs(el.getSetSelectValue() - this.percent);
    });

    this.marginPercentArr.sort(this.Compare);
    this.move();
  }

  private Compare(a: number, b: number) {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
  }

  private move() {
    this.movePercent.forEach(el => {
      const value = Math.abs(el.getSetSelectValue() - this.percent);

      if (value === this.marginPercentArr[0])
        el.setCurrentMarginPercent(this.percent);
    });
  }

  addHandle(handle: IHandle) {
    this.movePercent.push(handle);
  }

  hideScale() {
    this.scale.classList.add("slider-scaleSetMargin-hidden");
  }

  showScale() {
    this.scale.classList.remove("slider-scaleSetMargin-hidden");
  }



  // for tests

  getMovePercent(): number {
    return this.movePercent.length;
  }

  getScaleClass(): string{
    return this.scale.className;
  }

}