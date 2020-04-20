

interface IModelObservable {
    AddObserver(modelObserver: IModelObserver): void;
    DeleteObserver(modelObserver: IModelObserver): void;
    Notify(): void;
}

export interface IModelObserver {
    GetValue(selectValue: string): void;
}

export interface IModel {
    selectValue: string;
    SetSelectValue(percent: number): void;
}

export class ModelNumber implements IModel, IModelObservable {
    minValue: number;
    maxValue: number;
    selectValue: string;
    differentValue: number;
    observer: IModelObserver[];
    constructor(minValue: number, maxValue: number, observer: IModelObserver[] = []) {
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.differentValue = maxValue - minValue;
        this.observer = observer;
        this.selectValue = "";
        this.SetSelectValue(50);
    }


    SetSelectValue(percent: number): void {
        this.selectValue = String(this.minValue + this.differentValue * percent / 100);
        this.Notify();
    }

    AddObserver(modelObserver: IModelObserver): void {
        this.observer.push(modelObserver);
    }

    DeleteObserver(modelObserver: IModelObserver): void {
        let index = this.observer.indexOf(modelObserver);
        if (index > -1) {
            this.observer.splice(index, 1);
        }
    }

    Notify(): void {
        if (this.observer != null || this.observer != undefined) {
            this.observer.forEach(el => {
                el.GetValue(this.selectValue);
            });
        }
    }
}