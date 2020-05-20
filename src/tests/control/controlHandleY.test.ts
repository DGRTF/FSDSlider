import HandleY from "../../Control/controlHandleY";
import { IControlObserverCoordinate } from "../../Control/control";

require('jsdom-global')();

class Observer implements IControlObserverCoordinate {

  coordinatePercent: number = null;

  SetCoordinatePercent(coordinatePercent: number) {
    this.coordinatePercent = coordinatePercent;
  }

}



describe('Class HandleY', () => {

  let parentElement = document.createElement("div");

  Object.defineProperties(parentElement, {
    offsetHeight: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  let handle = new HandleY(parentElement);

  test('HandleY.SetCurrentMarginPercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 1)', () => {
    let valuesPercent: number[] = [0, -.1, .2, -.8, 1.2, 1];
    let outputValues: number[] = [200, 200, 160, 160, 160, 0];
    valuesPercent.forEach((el, index) => {
      handle.SetCurrentMarginPercent(el);
      expect(handle.GetHandleStyleTop()).toEqual(`${outputValues[index]}px`);
    });
  });

  test('HandleY.SetMinMargin(minMargin: number) задаёт минимально возможный отступ по входному процентному значению (от 0 до 1)', () => {
    handle = new HandleY(parentElement);
    let valuesPercent: number[] = [0, -.1, .2, -1, .8, 1.2];
    let outputValues: number[] = [200, 200, 160, 160, 40, 40];
    valuesPercent.forEach((el, index) => {
      handle.SetMinMargin(el);
      expect(handle.GetMinMargin()).toEqual(outputValues[index]);
    });
  });

  test('HandleY.SetMaxMargin(maxMargin: number) задаёт максимально возможный отступ по входному процентному значению (от 0 до 1)', () => {
    handle = new HandleY(parentElement);
    let valuesPercent: number[] = [0, -.1, .2, -.8, 1.2, 1];
    let outputValues: number[] = [200, 200, 160, 160, 160, 0];
    valuesPercent.forEach((el, index) => {
      handle.SetMaxMargin(el);
      expect(handle.GetMaxMargin()).toEqual(outputValues[index]);
    });
  });



  let deleteObserver = new Observer();

  test('HandleX.AddObserver(controlObserver: IControlObserverCoordinate) Добавляет наблюдателя в массив', () => {
    handle = new HandleY(parentElement);
    handle.AddObserver(new Observer());
    handle.AddObserver(new Observer());
    handle.AddObserver(deleteObserver);
    expect(handle.GetObserver().length).toEqual(3);
  });

  test('HandleY.DeleteObserver(controlObserver: IControlObserverCoordinate) Удаляет наблюдателя из массива', () => {
    handle.DeleteObserver(deleteObserver);
    expect(handle.GetObserver().length).toEqual(2);
  });

  let observer = new Observer();

  test('HandleY.Notify() Уведомляет наблюдателя', () => {
    handle = new HandleY(parentElement);
    handle.AddObserver(observer);
    handle.SetCurrentMarginPercent(.4);
    expect(observer.coordinatePercent).toEqual(.4);
  });

  test('HandleY.GetSetSelectValue() возвращает текущую координату в процентах( от 0 до 1)', () => {
    handle = new HandleY(parentElement);
    handle.SetCurrentMarginPercent(0);
    expect(handle.GetSetSelectValue()).toEqual(0);
  });

});
