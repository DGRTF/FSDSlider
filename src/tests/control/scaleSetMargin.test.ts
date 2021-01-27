require('jsdom-global')();

import ScaleSetMargin from "../../Control/scaleSetMargin";
import HandleX from "../../Control/controlHandleX";
import HandleY from "../../Control/controlHandleY";



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

function FactoryHandle() {
  return new HandleX(FactoryParentElement());
}

function FactoryScale() {
  return new ScaleSetMargin(FactoryParentElement());
}

function FactoryHandleY() {
  return new HandleY(FactoryParentElement());
}

function FactoryScaleHorizontal() {
  return new ScaleSetMargin(FactoryParentElement(), false);
}





it('ScaleSetMargin.AddHandle(handle: IHandle) добавляет экземпляр типа IHandle', () => {
  const scaleSetMargin = FactoryScale();
  scaleSetMargin.AddHandle(FactoryHandle());
  const length = scaleSetMargin.GetMovePercent();
  expect(length).toEqual(1);
});

it('ScaleSetMargin.HideScale() скрывает шкалу', () => {
  const scaleSetMargin = FactoryScale();
  scaleSetMargin.HideScale();
  const classes: string = scaleSetMargin.GetScaleClass();
  expect(classes.indexOf("slider-scaleSetMargin-hidden")).not.toEqual(-1);
});

it('ScaleSetMargin.ShowScale() показывает шкалу', () => {
  const scaleSetMargin = FactoryScale();
  scaleSetMargin.HideScale();
  scaleSetMargin.ShowScale();
  const classes: string = scaleSetMargin.GetScaleClass();
  expect(classes.indexOf("slider-scaleSetMargin-hidden")).toEqual(-1);
});



// horizontal

it('ScaleSetMargin.AddHandle(handle: IHandle) добавляет экземпляр типа IHandle', () => {
  const scaleSetMargin = FactoryScaleHorizontal();
  scaleSetMargin.AddHandle(FactoryHandleY());
  const length = scaleSetMargin.GetMovePercent();
  expect(length).toEqual(1);
});

it('ScaleSetMargin.HideScale() скрывает шкалу', () => {
  const scaleSetMargin = FactoryScaleHorizontal();
  scaleSetMargin.HideScale();
  const classes: string = scaleSetMargin.GetScaleClass();
  expect(classes.indexOf("slider-scaleSetMargin-hidden")).not.toEqual(-1);
});

it('ScaleSetMargin.ShowScale() показывает шкалу', () => {
  const scaleSetMargin = FactoryScaleHorizontal();
  scaleSetMargin.HideScale();
  scaleSetMargin.ShowScale();
  const classes: string = scaleSetMargin.GetScaleClass();
  expect(classes.indexOf("slider-scaleSetMargin-hidden")).toEqual(-1);
});

"scaleSetMargin.ts   |      66 |    23.08 |   64.71 |   70.21 | 68-94"
"scaleSetMargin.ts   |   67.31 |    23.08 |   66.67 |   71.43 | 70-96"
"scaleSetMargin.ts   |   64.71 |    23.08 |   61.11 |   68.75 | 68-99"