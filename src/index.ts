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

    initialize(sliderOb:
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

      this.controlFacade.addObserverHandle(view, 0);
      this.controlFacade.addObserverHandle(modelNumber, 0);
      modelNumber.addObserver(view);


      if (sliderOb.range) {
        const modelNumber1 = new ModelNumber(sliderOb.minValue, sliderOb.maxValue);

        const view1 = new View(this.parentElement, sliderOb.orientation);

        this.controlFacade.addObserverHandle(view1, 1);
        this.controlFacade.addObserverHandle(modelNumber1, 1);
        modelNumber1.addObserver(view1);

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
        this.addClassesCssView(" slider-view-horizontal-offset", 0);
      } else {
        this.addClassesCssView(" slider-view-vertical-offset", 0);
      }

      this.setValuePercent(.2, 0);
      this.setValuePercent(.8, 1);

      this.scale = new ScaleValue(this.parentElement, modelNumber, sliderOb.orientation);

    }

    showValue(numb: number) {
      if (numb < this.viewArr.length && numb >= 0) {
        this.viewArr[numb].showView();
      }
    }

    hiddenValue(numb: number) {
      if (numb < this.viewArr.length && numb >= 0) {
        this.viewArr[numb].hiddenView();
      }
    }

    setValuePercent(percent: number, numb: number) {
      this.controlFacade.setCurrentMarginPercent(percent, numb);
    }

    setValue(selectValue: number, numb: number) {
      if (numb < this.modelArr.length && numb >= 0) {
        let percent = this.modelArr[numb].getPercentFromValue(`${selectValue}`);
        this.controlFacade.setCurrentMarginPercent(percent, numb);
      }
    }

    setStep(step: number) {
      this.modelArr.forEach(el => {
        el.setStep(step);
      })
      this.controlFacade.updateHandle();
    }

    setMaxValue(maxValue: number) {
      let percent: number;
      if (maxValue < Number(this.modelArr[this.modelArr.length - 1].getSelectValue())) {
        for (let i = this.modelArr.length - 1; i >= 0; i--) {
          this.modelArr[i].setMaxValue(maxValue);
          if (maxValue < Number(this.modelArr[i].getSelectValue())) {
            percent = 100;
          } else {
            percent = this.modelArr[i].getPercentFromValue(this.modelArr[i].getSelectValue());
          }
          this.setValuePercent(percent, i);
        }
        this.scale.setValues();
      } else {
        this.modelArr.forEach((el, item) => {
          el.setMaxValue(maxValue);
          this.setValue(Number(el.getSelectValue()), item);
        });
        this.scale.setValues();
      }
    }

    setMinValue(minValue: number) {
      if (minValue > Number(this.modelArr[0].getSelectValue())) {
        this.modelArr.forEach((el, item) => {
          el.setMinValue(minValue);
          if (minValue > Number(el.getSelectValue()))
            this.setValuePercent(0, item);
          else
            this.setValue(Number(el.getSelectValue()), item);
        });
        this.scale.setValues();
      } else {
        for (let i = this.modelArr.length - 1; i >= 0; i--) {
          this.modelArr[i].setMinValue(minValue);
          this.setValue(Number(this.modelArr[i].getSelectValue()), i);
        }
        this.scale.setValues();
      }

    }

    addHandlerChangeValue(listener: (selectValue: string) => void, numb: number) {
      if (numb < this.modelObserverArr.length && numb >= 0) {
        this.modelObserverArr[numb].addObserver(new AddListener(listener));
      }
    }

    getSelectValue(numb: number): string {
      if (numb < this.modelArr.length && numb >= 0) {
        return this.modelArr[numb].getSelectValue();
      }
    }

    addClassesCssView(classes: string, item: number) {
      if (item < this.viewArr.length && item >= 0) {
        this.viewArr[item].addClassesCss(classes);
      }
    }

    hideScale() {
      this.controlFacade.hideScale();
      this.scale.hideScale();
    }

    showScale() {
      this.controlFacade.showScale();
      this.scale.showScale();
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
      methods.initialize.call(methods, method);
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