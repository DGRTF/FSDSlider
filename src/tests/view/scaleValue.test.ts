import ScaleValue from "../../View/scaleValue";
import { ModelNumber, IModel, IValue } from "../../Model/model";

require('jsdom-global')();

function FactoryParentElement() {
  let parentElement = document.createElement("div");

  Object.defineProperties(parentElement, {
    offsetWidth: {
      get() { return parseFloat("200px") || 0 }
    },
    offsetHeight: {
      get() { return parseFloat("200px") || 0 }
    },
  });
  return parentElement
}

function FactoryIValue() {
  return new ModelNumber(-1000, 1000);
}

function FactoryScaleValue() {
  return new ScaleValue(FactoryParentElement(), FactoryIValue());
}

function FactoryScaleValueVertical() {
  return new ScaleValue(FactoryParentElement(), FactoryIValue(), false);
}


it('ScaleValue.SetValues() задаёт максимальное, минимальное и среднее значения из текущей модели', () => {
  const scaleValue = FactoryScaleValue();
  scaleValue.SetValues();
  const values: string = scaleValue.GetSettingValue();
  expect(values).toEqual("-1000 0 1000");
});

it('ScaleSetMargin.SetIValue(model: IValue) задаёт новую модель для расчётов', () => {
  const scaleValue = FactoryScaleValue();
  const model: IValue = new ModelNumber(-100, 50);
  scaleValue.SetIValue(model);
  const retIValue: IValue = scaleValue.GetIValue();
  expect(retIValue).toEqual(model);

  const values: string = scaleValue.GetSettingValue();
  expect(values).toEqual("-100 -25 50");
});

it('ScaleValue.HideScale() скрывает значения', () => {
  const scaleValue = FactoryScaleValueVertical();
  scaleValue.HideScale();
  const classes: string = scaleValue.GetClassesValueContainer();
  expect(classes.indexOf("slider-view-hide")).not.toEqual(-1);
});

it('ScaleValue.ShowScale() показывает значения', () => {
  const scaleValue = FactoryScaleValueVertical();
  scaleValue.HideScale();
  scaleValue.ShowScale();
  const classes: string = scaleValue.GetClassesValueContainer();
  expect(classes.indexOf("slider-view-hide")).toEqual(-1);
});