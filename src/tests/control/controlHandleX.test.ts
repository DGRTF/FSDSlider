require('jsdom-global')();

import HandleX from "../../Control/controlHandleX";
import { IControlObserverCoordinate } from "../../Control/control";



class Observer implements IControlObserverCoordinate {

  coordinatePercent: number = null;

  setCoordinatePercent(coordinatePercent: number) {
    this.coordinatePercent = coordinatePercent;
  }

}



describe('Class HandleX', () => {

  let parentElement = document.createElement("div");

  Object.defineProperties(parentElement, {
    offsetWidth: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  let handle = new HandleX(parentElement);

  test('HandleX.SetCurrentMarginPercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 1)', () => {
    let valuesPercent: number[] = [0, -.1, .2, -0.1, .8, 1.2, 1];
    let outputValues: number[] = [0, 0, 40, 40, 160, 160, 200];
    valuesPercent.forEach((el, index) => {
      handle.setCurrentMarginPercent(el);
      expect(handle.getHandleStyleLeft()).toEqual(`${outputValues[index]}px`);
    });
  });

  test('HandleX.SetMinMargin(minMargin: number) задаёт минимально возможный отступ по входному процентному значению (от 0 до 1)', () => {
    handle = new HandleX(parentElement);
    let valuesPercent: number[] = [0, -.1, .2, -1, .8, 120];
    let outputValues: number[] = [0, 0, 40, 40, 160, 160];
    valuesPercent.forEach((el, index) => {
      handle.setMinMargin(el);
      expect(handle.getMinMargin()).toEqual(outputValues[index]);
    });
  });

  test('HandleX.SetMaxMargin(maxMargin: number) задаёт максимально возможный отступ по входному процентному значению (от 0 до 1)', () => {
    handle = new HandleX(parentElement);
    let valuesPercent: number[] = [0, -.1, .2, -.8, 1.2, 1];
    let outputValues: number[] = [0, 0, 40, 40, 40, 200];
    valuesPercent.forEach((el, index) => {
      handle.setMaxMargin(el);
      expect(handle.getMaxMargin()).toEqual(outputValues[index]);
    });
  });


  let deleteObserver = new Observer();

  test('HandleX.AddObserver(controlObserver: IControlObserverCoordinate) Добавляет наблюдателя в массив', () => {
    handle = new HandleX(parentElement);
    handle.addObserver(new Observer());
    handle.addObserver(new Observer());
    handle.addObserver(deleteObserver);
    expect(handle.getObserver().length).toEqual(3);
  });

  test('HandleX.DeleteObserver(controlObserver: IControlObserverCoordinate) Удаляет наблюдателя из массива', () => {
    handle.deleteObserver(deleteObserver);
    expect(handle.getObserver().length).toEqual(2);
  });

  let observer = new Observer();
    
  test('HandleX.Notify() Уведомляет наблюдателя', () => {
    handle = new HandleX(parentElement);
    handle.addObserver(observer);
    handle.setCurrentMarginPercent(.4);
    expect(observer.coordinatePercent).toEqual(.4);
  });

  test('HandleX.GetSetSelectValue() возвращает текущую координату в процентах( от 0 до 1)', () => {
    handle = new HandleX(parentElement);
    handle.setCurrentMarginPercent(0);
    expect(handle.getSetSelectValue()).toEqual(0);
  });

});
