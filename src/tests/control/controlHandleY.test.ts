import HandleY from "../../Control/controlHandleY";
import { IControlObserverCoordinate } from "../../Control/control";

require('jsdom-global')();

class Observer implements IControlObserverCoordinate {

  coordinatePercent: number = null;

  SetCoordinatePercent(coordinatePercent: number) {
    this.coordinatePercent = coordinatePercent;
    console.warn(coordinatePercent);
  }

}



describe('Class HandleY', () => {

  let parentElement = document.createElement("div");

  Object.defineProperties(parentElement, {
    offsetHeight: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  const handle = new HandleY(parentElement);

  test('HandleY.SetCurrentMarginPercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 100)', () => {
    let valuesPercent: number[] = [0, -10, 20, 80, 100, 120];
    let outputValues: number[] = [200, 200, 160, 40, 0, 0];
    console.warn("object");
    valuesPercent.forEach((el, index) => {
      handle.SetCurrentMarginPercent(el);
      expect(handle.GetHandleStyleTop()).toEqual(`${outputValues[index]}px`);
    });
  });

  test('HandleX.SetMinMargin(minMargin: number) задаёт минимально возможный отступ по входному процентному значению (от 0 до 100)', () => {
    let valuesPercent: number[] = [0, -10, 20, 80, 100, 120];
    let outputValues: number[] = [200, 200, 160, 40, 0, 0];
    valuesPercent.forEach((el, index) => {
      handle.SetMinMargin(el);
      expect(handle.GetMinMargin()).toEqual(outputValues[index]);
    });
  });

  test('HandleX.SetMaxMargin(maxMargin: number) задаёт максимально возможный отступ по входному процентному значению (от 0 до 100)', () => {
    let valuesPercent: number[] = [0, -10, 20, 80, 100, 120];
    let outputValues: number[] = [200, 200, 160, 40, 0, 0];
    console.warn("object");
    valuesPercent.forEach((el, index) => {
      handle.SetMaxMargin(el);
      expect(handle.GetMaxMargin()).toEqual(outputValues[index]);
    });
  });



  let deleteObserver = new Observer();

  test('HandleX.AddObserver(controlObserver: IControlObserverCoordinate) Добавляет наблюдателя в массив', () => {
    handle.AddObserver(new Observer());
    handle.AddObserver(new Observer());
    handle.AddObserver(deleteObserver);
    console.warn("object");
    expect(handle.GetObserver().length).toEqual(3);
  });

  test('HandleY.DeleteObserver(controlObserver: IControlObserverCoordinate) Удаляет наблюдателя из массива', () => {
    handle.DeleteObserver(deleteObserver);
    expect(handle.GetObserver().length).toEqual(2);
  });

  let observer = new Observer();

  test('HandleY.Notify() Уведомляет наблюдателя', () => {
    handle.AddObserver(observer);
    console.warn(handle.GetObserver().length);
    handle.SetCurrentMarginPercent(40);
    // handle.Notify();
    expect(observer.coordinatePercent).toEqual(20);
  });


});
