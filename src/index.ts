import { ModelNumber, IModel, IModelObservable } from './Model/model';
import ControlFacade from './Control/controlFacade';
import { View, IView } from './View/view';

import './View/view.scss';
import './index.scss';
import './Control/control.scss';
import AddListener from './Model/addListener';
import ScaleValue from './View/scaleValue';

$(document).ready(function ($) {

  class Methods {

    constructor(parentElement: JQuery) {
      this.parentElement = parentElement[0];
    }

    private modelArr: IModel[];

    private viewArr: IView[];

    private modelObserverArr: IModelObservable[];

    private controlFacade: ControlFacade;

    private parentElement: HTMLElement;

    private scale: ScaleValue;

    Initialize(sliderOb:
      {
        minValue?: number, maxValue?: number,
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

      this.controlFacade = new ControlFacade(this.parentElement, sliderOb.orientation, sliderOb.range)

      const modelNumber = new ModelNumber(sliderOb.minValue, sliderOb.maxValue);

      const view = new View(this.parentElement, sliderOb.orientation);

      this.controlFacade.AddObserverHandle(view, 0);
      this.controlFacade.AddObserverHandle(modelNumber, 0);
      modelNumber.AddObserver(view);


      if (sliderOb.range) {
        const modelNumber1 = new ModelNumber(sliderOb.minValue, sliderOb.maxValue);

        const view1 = new View(this.parentElement, sliderOb.orientation);

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

      if (sliderOb.orientation) {
        this.AddClassesCssView(" slider-view-horizontal-offset", 0);
      } else {
        this.AddClassesCssView(" slider-view-vertical-offset", 0);
      }

      this.SetValuePercent(.2, 0);
      this.SetValuePercent(.8, 1);

      this.scale = new ScaleValue(this.parentElement, modelNumber, sliderOb.orientation);

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
      this.controlFacade.UpdateHandle();
    }

    SetMaxValue(maxValue: number) {
      let percent: number;
      if (maxValue < Number(this.modelArr[this.modelArr.length - 1].GetSelectValue())) {
        for (let i = this.modelArr.length - 1; i >= 0; i--) {
          this.modelArr[i].SetMaxValue(maxValue);
          if (maxValue < Number(this.modelArr[i].GetSelectValue())) {
            percent = 100;
          } else {
            percent = this.modelArr[i].PercentInValue(Number(this.modelArr[i].GetSelectValue()));
          }
          this.SetValuePercent(percent, i);
        }
        this.scale.SetValues();
      } else {
        this.modelArr.forEach((el, item) => {
          el.SetMaxValue(maxValue);
          this.SetValue(Number(el.GetSelectValue()), item);
        });
        this.scale.SetValues();
      }
    }

    SetMinValue(minValue: number) {
      if (minValue > Number(this.modelArr[0].GetSelectValue())) {
        this.modelArr.forEach((el, item) => {
          el.SetMinValue(minValue);
          if (minValue > Number(el.GetSelectValue()))
            this.SetValuePercent(0, item);
          else
            this.SetValue(Number(el.GetSelectValue()), item);
        });
        this.scale.SetValues();
      } else {
        for (let i = this.modelArr.length - 1; i >= 0; i--) {
          this.modelArr[i].SetMinValue(minValue);
          this.SetValue(Number(this.modelArr[i].GetSelectValue()), i);
        }
        this.scale.SetValues();
      }

    }

    AddHandlerChangeValue(listener: (selectValue: string) => void, numb: number) {
      if (numb < this.modelObserverArr.length && numb >= 0) {
        this.modelObserverArr[numb].AddObserver(new AddListener(listener));
      }
    }

    GetSelectValue(numb: number): string {
      if (numb < this.modelArr.length && numb >= 0) {
        return this.modelArr[numb].GetSelectValue();
      }
    }

    AddClassesCssView(classes: string, item: number) {
      if (item < this.viewArr.length && item >= 0) {
        this.viewArr[item].AddClassesCss(classes);
      }
    }

    HideScale() {
      this.controlFacade.HideScale();
      this.scale.HideScale();
    }

    ShowScale() {
      this.controlFacade.ShowScale();
      this.scale.ShowScale();
    }

  }

  let methods: Methods = null;

  let methodsArr: Methods[] = [];
  let jThis: JQuery<HTMLElement>[] = [];

  return $.fn.RangeSliderInit = function (method: any, ...params: any[]) {
    if (typeof method === 'object' || !method) {
      methods = new Methods(this);
      methodsArr.push(methods);
      jThis.push(this);
      methods.Initialize.call(methods, method);
      return this;
    } else if ((methods as any)[method]) {
      const index = jThis.indexOf(this);
      if (index > -1) {
        methods = methodsArr[index];
      }
      return (methods as any)[method].call(methods, ...params);
    } else {
      $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
    }
  }

}(jQuery));