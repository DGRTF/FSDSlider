import { IModel } from "../Model/model"
import "./control.scss";

export interface IControlObserverCoordinate {
    SetCoordinate(coordinate: number): void;
}

interface IControlObservable {
    AddObserver(modelObserver: IControlObserverCoordinate): void;
    DeleteObserver(modelObserver: IControlObserverCoordinate): void;
    Notify(): void
}

export class Control {
    constructor(parentElement: HTMLElement, orientation: boolean = true, handle?: IHandle) {
        this.handle = handle;
        this.parentElement = parentElement;
        this.orientation = orientation;
        this.Init();
    }

    private handle: IHandle;
    private orientation: boolean;

    private trackElement: HTMLElement;
    private parentElement: HTMLElement;

    private Init() {
        this.trackElement = document.createElement("div");
        this.parentElement.appendChild(this.trackElement);
        if (this.orientation)
            this.trackElement.className += " slider-track-element";
        else
            this.trackElement.className += " slider-track-element-vertical";
    }
}

export interface IView {
    GetValue(selectValue: string): void;
}

interface IHandle {
    SetCurrentMarginPercent(percent: number): void;
    // HiddenView(): void;
    // ShowView(): void;
}

interface IControlMin {
    SetMinMargin(minMargin: number): void;
}

interface IControlMax {
    SetMaxMargin(maxMargin: number): void;
}

export class ControlX implements IControlObservable, IHandle, IControlMin, IControlMax {
    private handle: HTMLElement;
    private parentElement: HTMLElement;

    private maxSpace: number;
    private currentMargin: number;
    private mouseX: number;
    private handleX: number;
    private minMargin: number;
    private maxMargin: number;

    private modelNumber: IModel;
    private observer: IControlObserverCoordinate[];

    constructor(parentElement: HTMLElement, modelNumber: IModel, controlObserver: IControlObserverCoordinate[] = []) {
        this.parentElement = parentElement;
        this.modelNumber = modelNumber;
        this.observer = controlObserver;

        this.init();
        this.minMargin = 0 - this.handle.offsetWidth / 2;
        this.maxMargin = - this.handle.offsetWidth / 2 + this.parentElement.offsetWidth;
    }

    private init() {
        this.handle = document.createElement("div");

        this.AddClasses();
        this.AddContentHtml();

        this.handle.addEventListener("mousedown", this.AddEventMouseMove.bind(this));

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", this.move);
        });
    }

    private AddClasses() {
        this.parentElement.className += " slider-parent-element";
        this.handle.className += "slider-handle";
    }

    private AddContentHtml() {
        this.parentElement.appendChild(this.handle);
    }

    private AddEventMouseMove(event: MouseEvent) {
        this.mouseX = event.pageX;
        document.addEventListener("mousemove", this.move);
        this.handleX = this.handle.getBoundingClientRect().left;
    }

    private MoveBlock(event: MouseEvent) {
        this.currentMargin = this.handleX - this.mouseX + event.pageX - this.parentElement.getBoundingClientRect().left;
        this.maxSpace = this.parentElement.offsetWidth;
        if (this.currentMargin <= this.maxSpace && this.currentMargin >= 0 - this.handle.offsetWidth / 2) {
            if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
                this.handle.style.left = String(this.currentMargin) + "px";
                this.modelNumber.SetSelectValue((this.currentMargin + this.handle.offsetWidth / 2) / this.maxSpace * 100);
                this.Notify();
            }
        }
    }

    private move = this.MoveBlock.bind(this);



    SetCurrentMarginPercent(percent: number) {
        if (percent <= 100 && percent >= 0) {
            this.maxSpace = this.parentElement.offsetWidth - this.handle.offsetWidth;
            this.currentMargin = this.maxSpace * percent / 100 - this.handle.offsetWidth / 2;
            if (this.currentMargin > this.minMargin && this.currentMargin < this.maxMargin) {
                this.modelNumber.SetSelectValue(percent);
                this.handle.style.left = String(this.currentMargin) + "px";
                this.Notify();
            }
        }
    }



    SetMinMargin(minMargin: number) {
        this.minMargin = minMargin - this.handle.offsetWidth / 2;
    }

    SetMaxMargin(maxMargin: number) {
        this.maxMargin = maxMargin - this.handle.offsetWidth / 2;
    }



    AddObserver(controlObserver: IControlObserverCoordinate) {
        this.observer.push(controlObserver);
    }

    DeleteObserver(controlObserver: IControlObserverCoordinate) {
        let index = this.observer.indexOf(controlObserver);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    Notify() {
        if (this.observer != null || this.observer != undefined) {
            this.observer.forEach(el => {
                console.log("GENA");
                el.SetCoordinate(this.currentMargin + this.handle.offsetWidth / 2);
            });
        }
    }
}


export class ControlY implements IControlObservable, IHandle, IControlMin, IControlMax {
    private handle: HTMLElement;
    private parentElement: HTMLElement;

    private maxSpace: number;
    private currentMargin: number;
    private mouseY: number;
    private handleY: number;
    private minMargin: number;
    private maxMargin: number;

    private modelNumber: IModel;
    private observer: IControlObserverCoordinate[];

    constructor(parentElement: HTMLElement, modelNumber: IModel, controlObserver: IControlObserverCoordinate[] = []) {
        this.parentElement = parentElement;
        this.modelNumber = modelNumber;
        this.observer = controlObserver;

        this.init();
        this.minMargin = 0 - this.handle.offsetHeight / 2;
        this.maxMargin = - this.handle.offsetHeight / 2 + this.parentElement.offsetHeight;
    }

    private init() {
        this.handle = document.createElement("div");

        this.AddClasses();
        this.AddContentHtml();

        this.handle.addEventListener("mousedown", this.AddEventMouseMove.bind(this));

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", this.move);
        });
    }

    private AddClasses() {
        this.parentElement.className += " slider-parent-element";
        this.handle.className += "slider-handle";
    }

    private AddContentHtml() {
        this.parentElement.appendChild(this.handle);
    }

    private AddEventMouseMove(event: MouseEvent) {
        this.mouseY = event.pageY;
        document.addEventListener("mousemove", this.move);
        this.handleY = this.handle.getBoundingClientRect().top;
    }

    private MoveBlock(event: MouseEvent) {
        this.currentMargin = this.handleY - this.mouseY + event.pageY - this.parentElement.getBoundingClientRect().left;
        this.maxSpace = this.parentElement.offsetHeight;
        if (this.currentMargin <= this.maxSpace && this.currentMargin >= 0 - this.handle.offsetHeight / 2) {
            if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
                this.handle.style.top = String(this.currentMargin) + "px";
                this.modelNumber.SetSelectValue((this.currentMargin + this.handle.offsetHeight / 2) / this.maxSpace * 100);
                this.Notify();
            }
        }
    }

    private move = this.MoveBlock.bind(this);



    SetCurrentMarginPercent(percent: number) {
        if (percent <= 100 && percent >= 0) {
            this.maxSpace = this.parentElement.offsetHeight - this.handle.offsetHeight;
            this.currentMargin = this.maxSpace * percent / 100 - this.handle.offsetHeight / 2;
            if (this.currentMargin > this.minMargin && this.currentMargin < this.maxMargin) {
                this.modelNumber.SetSelectValue(percent);
                this.handle.style.top = String(this.currentMargin) + "px";
                this.Notify();
            }
        }
    }



    SetMinMargin(minMargin: number) {
        this.minMargin = minMargin - this.handle.offsetHeight / 2;
    }

    SetMaxMargin(maxMargin: number) {
        this.maxMargin = maxMargin - this.handle.offsetHeight / 2;
    }



    AddObserver(controlObserver: IControlObserverCoordinate) {
        this.observer.push(controlObserver);
    }

    DeleteObserver(controlObserver: IControlObserverCoordinate) {
        let index = this.observer.indexOf(controlObserver);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    Notify() {
        if (this.observer != null || this.observer != undefined) {
            this.observer.forEach(el => {
                console.log("GENA");
                el.SetCoordinate(this.currentMargin + this.handle.offsetHeight / 2);
            });
        }
    }
}