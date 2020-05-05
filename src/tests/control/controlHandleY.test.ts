import { HandleY } from "../../Control/controlHandleY";

require('jsdom-global')();


describe('Class HandleY', () => {

  let parentElement = document.createElement("div");

  Object.defineProperties(parentElement, {
    offsetHeight: {
      get () { return parseFloat("200px") || 0 }
    },
  })

  const handle = new HandleY(parentElement);

  test('HandleY.SetCurrentMarginPercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 100)', () => {
    let valuesPercent: number[] = [0, -10, 20, 80, 100, 120];
    let outputValues: number[] = [0, 0, 40, 160, 200, 200];
    valuesPercent.forEach((el, index) => {
      handle.SetCurrentMarginPercent(el);
      expect(handle.GetHandleStyleTop()).toEqual(`${outputValues[index]}px`);
    });
  });

  test('HandleX.SetMinMargin(minMargin: number) задаёт минимально возможный отступ по входному процентному значению (от 0 до 100)', () => {
    handle.SetMinMargin(10);
    expect(handle.GetMinMargin()).toEqual(20 - handle.GetHandleOffsetHeight() / 2);
  });

  test('HandleX.SetMaxMargin(maxMargin: number) задаёт максимально возможный отступ по входному процентному значению (от 0 до 100)', () => {
    handle.SetMaxMargin(20);
    expect(handle.GetMaxMargin()).toEqual(40 - handle.GetHandleOffsetHeight() / 2);
  });

  test('HandleX.AddObserver(controlObserver: IControlObserverCoordinate) Добавляет наблюдателя в массив', () => {
    handle.AddObserver(null);
    handle.AddObserver(null);
    handle.AddObserver(null);
    expect(handle.GetObserver().length).toEqual(3);
  });

  test('HandleY.DeleteObserver(controlObserver: IControlObserverCoordinate) Удаляет наблюдателя из массива', () => {
    handle.DeleteObserver(null);
    expect(handle.GetObserver().length).toEqual(2);
  });
});
