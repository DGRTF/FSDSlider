require('jsdom-global')();

import ScaleSetMargin from "../../Control/scaleSetMargin";
import HandleX from "../../Control/controlHandleX";
import HandleY from "../../Control/controlHandleY";



function getParentElement() {
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

function getHandle() {
  return new HandleX(getParentElement());
}

function getScale() {
  return new ScaleSetMargin(getParentElement());
}

function getHandleY() {
  return new HandleY(getParentElement());
}

function getScaleHorizontal() {
  return new ScaleSetMargin(getParentElement(), false);
}





it('ScaleSetMargin.AddHandle(handle: IHandle) добавляет экземпляр типа IHandle', () => {
  const scaleSetMargin = getScale();
  scaleSetMargin.addHandle(getHandle());
  const length = scaleSetMargin.getMovePercent();
  expect(length).toEqual(1);
});

it('ScaleSetMargin.HideScale() скрывает шкалу', () => {
  const scaleSetMargin = getScale();
  scaleSetMargin.hideScale();
  const classes: string = scaleSetMargin.getScaleClass();
  expect(classes.indexOf("slider-scaleSetMargin-hidden")).not.toEqual(-1);
});

it('ScaleSetMargin.ShowScale() показывает шкалу', () => {
  const scaleSetMargin = getScale();
  scaleSetMargin.hideScale();
  scaleSetMargin.showScale();
  const classes: string = scaleSetMargin.getScaleClass();
  expect(classes.indexOf("slider-scaleSetMargin-hidden")).toEqual(-1);
});



// horizontal

it('ScaleSetMargin.AddHandle(handle: IHandle) добавляет экземпляр типа IHandle', () => {
  const scaleSetMargin = getScaleHorizontal();
  scaleSetMargin.addHandle(getHandleY());
  const length = scaleSetMargin.getMovePercent();
  expect(length).toEqual(1);
});

it('ScaleSetMargin.HideScale() скрывает шкалу', () => {
  const scaleSetMargin = getScaleHorizontal();
  scaleSetMargin.hideScale();
  const classes: string = scaleSetMargin.getScaleClass();
  expect(classes.indexOf("slider-scaleSetMargin-hidden")).not.toEqual(-1);
});

it('ScaleSetMargin.ShowScale() показывает шкалу', () => {
  const scaleSetMargin = getScaleHorizontal();
  scaleSetMargin.hideScale();
  scaleSetMargin.showScale();
  const classes: string = scaleSetMargin.getScaleClass();
  expect(classes.indexOf("slider-scaleSetMargin-hidden")).toEqual(-1);
});

"scaleSetMargin.ts   |      66 |    23.08 |   64.71 |   70.21 | 68-94"
"scaleSetMargin.ts   |   67.31 |    23.08 |   66.67 |   71.43 | 70-96"
"scaleSetMargin.ts   |   64.71 |    23.08 |   61.11 |   68.75 | 68-99"