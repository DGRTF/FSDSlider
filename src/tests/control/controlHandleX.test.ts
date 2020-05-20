import HandleX from "../../Control/controlHandleX";
import { IControlObserverCoordinate } from "../../Control/control";

require('jsdom-global')();

class Observer implements IControlObserverCoordinate {

  coordinatePercent: number = null;

  SetCoordinatePercent(coordinatePercent: number) {
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
      handle.SetCurrentMarginPercent(el);
      expect(handle.GetHandleStyleLeft()).toEqual(`${outputValues[index]}px`);
    });
  });

  test('HandleX.SetMinMargin(minMargin: number) задаёт минимально возможный отступ по входному процентному значению (от 0 до 1)', () => {
    handle = new HandleX(parentElement);
    let valuesPercent: number[] = [0, -.1, .2, -1, .8, 120];
    let outputValues: number[] = [0, 0, 40, 40, 160, 160];
    valuesPercent.forEach((el, index) => {
      handle.SetMinMargin(el);
      expect(handle.GetMinMargin()).toEqual(outputValues[index]);
    });
  });

  test('HandleX.SetMaxMargin(maxMargin: number) задаёт максимально возможный отступ по входному процентному значению (от 0 до 1)', () => {
    handle = new HandleX(parentElement);
    let valuesPercent: number[] = [0, -.1, .2, -.8, 1.2, 1];
    let outputValues: number[] = [0, 0, 40, 40, 40, 200];
    valuesPercent.forEach((el, index) => {
      handle.SetMaxMargin(el);
      expect(handle.GetMaxMargin()).toEqual(outputValues[index]);
    });
  });


  let deleteObserver = new Observer();

  test('HandleX.AddObserver(controlObserver: IControlObserverCoordinate) Добавляет наблюдателя в массив', () => {
    handle = new HandleX(parentElement);
    handle.AddObserver(new Observer());
    handle.AddObserver(new Observer());
    handle.AddObserver(deleteObserver);
    expect(handle.GetObserver().length).toEqual(3);
  });

  test('HandleX.DeleteObserver(controlObserver: IControlObserverCoordinate) Удаляет наблюдателя из массива', () => {
    handle.DeleteObserver(deleteObserver);
    expect(handle.GetObserver().length).toEqual(2);
  });

  let observer = new Observer();
    
  test('HandleX.Notify() Уведомляет наблюдателя', () => {
    handle = new HandleX(parentElement);
    handle.AddObserver(observer);
    handle.SetCurrentMarginPercent(.4);
    expect(observer.coordinatePercent).toEqual(.4);
  });

  test('HandleX.GetSetSelectValue() возвращает текущую координату в процентах( от 0 до 1)', () => {
    handle = new HandleX(parentElement);
    handle.SetCurrentMarginPercent(0);
    expect(handle.GetSetSelectValue()).toEqual(0);
  });

});
