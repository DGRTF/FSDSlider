import MaxMargin from "../../Control/controlMaxMargin";
import { IControlMax } from "../../Control/control";

class ObserverMax implements IControlMax {

  maxMargin: number = null;

  SetMaxMargin(maxMargin: number) {
    this.maxMargin = maxMargin;
  }

}

describe('Class MaxMargin', () => {

  const observerMax = new ObserverMax();
  const maxMargin = new MaxMargin([observerMax]);
  const observerDelete = new ObserverMax();

  test('minMargin.AddMiMarginObserver(minValue: IControlMin) Добавляет наблюдателя за минимальным отступом', () => {
    maxMargin.AddMaxMarginObserver(observerDelete);
    maxMargin.AddMaxMarginObserver(new ObserverMax);
    expect(maxMargin.GetObserver().length).toEqual(3);
  });

  test('maxMargin.DeleteMaxMarginObserver(minValue: IControlMin) Удаляет наблюдателя за минимальным отступом', () => {
    maxMargin.DeleteMaxMarginObserver(observerDelete);
    maxMargin.DeleteMaxMarginObserver(observerDelete);
    expect(maxMargin.GetObserver().length).toEqual(2);
  });

  test('maxMargin.SetCoordinatePercent(coordinatePercent: number) Делегирует методу наблюдателя отступ в процентах', () => {
    maxMargin.SetCoordinatePercent(.2);
    expect(observerMax.maxMargin).toEqual(.2);
  });
});