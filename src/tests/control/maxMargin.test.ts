import MaxMargin from "../../Control/controlMaxMargin";
import { IControlMax } from "../../Control/control";

class ObserverMax implements IControlMax {

  maxMargin: number = null;

  setMaxMargin(maxMargin: number) {
    this.maxMargin = maxMargin;
  }

}

describe('Class MaxMargin', () => {

  const observerMax = new ObserverMax();
  const maxMargin = new MaxMargin([observerMax]);
  const observerDelete = new ObserverMax();

  test('minMargin.AddMiMarginObserver(minValue: IControlMin) Добавляет наблюдателя за минимальным отступом', () => {
    maxMargin.addMaxMarginObserver(observerDelete);
    maxMargin.addMaxMarginObserver(new ObserverMax);
    expect(maxMargin.getObserver().length).toEqual(3);
  });

  test('maxMargin.DeleteMaxMarginObserver(minValue: IControlMin) Удаляет наблюдателя за минимальным отступом', () => {
    maxMargin.deleteMaxMarginObserver(observerDelete);
    maxMargin.deleteMaxMarginObserver(observerDelete);
    expect(maxMargin.getObserver().length).toEqual(2);
  });

  test('maxMargin.SetCoordinatePercent(coordinatePercent: number) Делегирует методу наблюдателя отступ в процентах', () => {
    maxMargin.setCoordinatePercent(.2);
    expect(observerMax.maxMargin).toEqual(.2);
  });
});