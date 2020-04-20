import { ModelNumber } from "./Model/model";
import { ControlX, Control, ControlY } from "./Control/control";
import { View } from "./View/view";

import "./View/view.scss";
import "./index.scss";

let parentElementPlugin = <HTMLElement>document.querySelector(".parent");
let parentElementPluginY = <HTMLElement>document.querySelector(".parentY");
function Init({ parentElement, minValue = 0, maxValue = 100, orientation = true, quantityHandle = 1 }:
    { parentElement: HTMLElement, minValue?: number, maxValue?: number, orientation?: boolean, quantityHandle?: number }) {

    let modelNumber = new ModelNumber(minValue, maxValue);

    let view = new View(parentElement, orientation);
    let controlOne;
    let control = new Control(parentElement, orientation);

    if (orientation) {
        controlOne = new ControlX(parentElement, modelNumber);
    }
    else {
        controlOne = new ControlY(parentElement, modelNumber);
    }

    controlOne.AddObserver(view);
    modelNumber.AddObserver(view);
    view.HiddenView();
    view.ShowView();
    // controlOne.SetCurrentMarginPercent(50);
    // controlOne.SetMinMargin(10);

    let modelNumber1 = new ModelNumber(minValue, maxValue);

    let view1 = new View(parentElement, orientation);

    let controlOne1;
    if (orientation) {
        controlOne1 = new ControlX(parentElement, modelNumber1);
    }
    else {
        controlOne1 = new ControlY(parentElement, modelNumber1);
    }
    controlOne1.AddObserver(view1);
    modelNumber1.AddObserver(view1);
    view1.HiddenView();
    view1.ShowView();
    // controlOne1.SetCurrentMarginPercent(10);
}

Init({ parentElement: parentElementPlugin, minValue: -150, maxValue: 150 });

Init({ parentElement: parentElementPluginY, minValue: -150, maxValue: 150, orientation: false });

