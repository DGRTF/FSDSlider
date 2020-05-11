import { ModelNumber, IModel, IModelObservable } from './Model/model';
import { ControlFacade } from './Control/controlFacade';
import { View, IView } from './View/view';

import './View/view.scss';
import './index.scss';
import './Control/control.scss';
import { AddListener } from './Model/AddLIstener';

const parentElementPlugin = <HTMLElement>document.querySelector('.parent');
const parentElementPluginY = <HTMLElement>document.querySelector('.parentY');


(function ($) {

  class Methods {

    private modelArr: IModel[];

    private viewArr: IView[];

    private modelObserverArr: IModelObservable[];

    private controlFacade: ControlFacade;

    Initialize(sliderOb:
      {
        parentElement: HTMLElement, minValue?: number, maxValue?: number,
        orientation?: boolean, range?: boolean
      }) {

      if (sliderOb.minValue === null || sliderOb.minValue === undefined) {
        sliderOb.minValue = 0;
      }

      if (sliderOb.maxValue === null || sliderOb.maxValue === undefined) {
        sliderOb.maxValue = 100;
      }

      if (sliderOb.orientation === null || sliderOb.orientation === undefined) {
        sliderOb.orientation = true;
      }

      if (sliderOb.range === null || sliderOb.range === undefined) {
        sliderOb.range = false;
      }

      this.controlFacade = new ControlFacade(sliderOb.parentElement, sliderOb.orientation, sliderOb.range)

      const modelNumber = new ModelNumber(sliderOb.minValue, sliderOb.maxValue);

      const view = new View(sliderOb.parentElement, sliderOb.orientation);

      this.controlFacade.AddObserverHandle(view, 0);
      this.controlFacade.AddObserverHandle(modelNumber, 0);
      modelNumber.AddObserver(view);

      if (sliderOb.range) {
        const modelNumber1 = new ModelNumber(sliderOb.minValue, sliderOb.maxValue);

        const view1 = new View(sliderOb.parentElement, sliderOb.orientation);

        this.controlFacade.AddObserverHandle(view1, 1);
        this.controlFacade.AddObserverHandle(modelNumber1, 1);
        modelNumber1.AddObserver(view1);

        this.modelArr = [modelNumber, modelNumber1];
        this.viewArr = [view, view1];
        this.modelObserverArr = [modelNumber, modelNumber1];
      }
      else {
        this.modelArr = [modelNumber];
        this.viewArr = [view];
        this.modelObserverArr = [modelNumber];
      }

      this.SetValuePercent(20, 0);
      // this.SetValuePercent(0, 0);
      this.SetValuePercent(80, 1);
    }

    ShowValue(numb: number) {
      if (numb < this.viewArr.length && numb >= 0) {
        this.viewArr[numb].ShowView();
      }
    }

    HiddenValue(numb: number) {
      if (numb < this.viewArr.length && numb >= 0) {
        this.viewArr[numb].HiddenView();
      }
    }

    SetValuePercent(percent: number, numb: number) {
      this.controlFacade.SetCurrentMarginPercent(percent, numb);
    }

    SetValue(selectValue: number, numb: number) {
      if (numb < this.modelArr.length && numb >= 0) {
        let percent = this.modelArr[numb].PercentInValue(selectValue);
        this.controlFacade.SetCurrentMarginPercent(percent, numb);
      }
    }

    SetStep(step: number) {
      this.modelArr.forEach(el => {
        el.SetStep(step);
      })
    }

    SetMaxValue(maxValue: number) {
      this.modelArr.forEach((el, iter) => {
        el.SetMaxValue(maxValue);
        let percent = el.PercentInValue(Number(el.GetSelectValue()));
        this.SetValuePercent(percent, iter);
      });
    }

    SetMinValue(minValue: number) {
      this.modelArr.forEach((el, iter) => {
        el.SetMinValue(minValue);
        let percent = el.PercentInValue(Number(el.GetSelectValue()));
        this.SetValuePercent(percent, iter);
      });
    }

    AddHandlerChangeValue(listener: (selectValue: string) => void, numb: number) {
      if (numb < this.modelObserverArr.length && numb >= 0) {
        this.modelObserverArr[numb].AddObserver(new AddListener(listener));
      }
    }

  }

  let methods = new Methods();

  return $.fn.RangeSliderInit = function (method: any, ...params: any[]) {
    if ((methods as any)[method]) {
      return (methods as any)[method].call(methods, ...params);
    } else if (typeof method === 'object' || !method) {
      return methods.Initialize.call(methods, method);
    } else {
      $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
    }
  }

}(jQuery));



$('.parent').RangeSliderInit({
  parentElement: parentElementPlugin, minValue: -100, maxValue: 100, range: true
});

$('.parent').RangeSliderInit("HiddenValue", 1);
$('.parent').RangeSliderInit("HiddenValue", 0);

$('.parent').RangeSliderInit("ShowValue", 0);
$('.parent').RangeSliderInit("ShowValue", 1);

$('.parent').RangeSliderInit("SetValuePercent", 60, 1);

$('.parent').RangeSliderInit("SetValue", -10, 1);


$('.parent').RangeSliderInit("SetStep", 1);

$('.parent').RangeSliderInit("SetMaxValue", 1000);

$('.parent').RangeSliderInit("AddHandlerChangeValue", (selectValue: string) => {
  console.log(selectValue);
}, 0);

$('.parent').RangeSliderInit("AddHandlerChangeValue", (selectValue: string) => {
  console.log(selectValue);
}, 1);

$('.parentY').RangeSliderInit({
  parentElement: parentElementPluginY, minValue: -100, maxValue: 100, orientation: false, range: true
});

// $('.parentY').RangeSliderInit("SetValuePercent", 0, 0);

$('.parentY').RangeSliderInit("SetStep", 10);

$('.parentY').RangeSliderInit("SetMaxValue", 990);

$('.parentY').RangeSliderInit("SetStep", 1);

$('.parentY').RangeSliderInit("AddHandlerChangeValue", (selectValue: string) => {
  console.log(selectValue);
}, 0);

$('.parentY').RangeSliderInit("AddHandlerChangeValue", (selectValue: string) => {
  console.log(selectValue);
}, 1);
