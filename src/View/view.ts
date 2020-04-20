import { IModelObserver } from "../Model/model";
import { IView, IControlObserverCoordinate } from "../Control/control";




export class View implements IView, IModelObserver, IControlObserverCoordinate {
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
        // здесь создаётся див, потому что он может центрировать текст в отличие от инпута
        this.selectValueElement = document.createElement("div");
        if (this.orientation)
            this.selectValueElement.className += "slider-view-horizontal";
        else
            this.selectValueElement.className += "slider-view-vertical"
        this.parentElement.appendChild(this.selectValueElement);
    }

    GetValue(selectValue: string) {
        this.selectValueElement.innerText = selectValue;
    }

    SetCoordinate(coordinate: number) {
        if (this.orientation) {
            this.currentMargin = coordinate - this.selectValueElement.offsetWidth / 2;
            this.selectValueElement.style.left = String(this.currentMargin) + "px";
        }
        else {
            this.currentMargin = coordinate - this.selectValueElement.offsetHeight / 2;
            this.selectValueElement.style.top = String(this.currentMargin) + "px";
        }
    }

    HiddenView() {
        this.selectValueElement.hidden = true;
    }

    ShowView() {
        this.selectValueElement.hidden = false;
    }
}