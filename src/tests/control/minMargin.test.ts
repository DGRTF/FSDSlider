import MinMargin from "../../Control/controlMinMargin";
import { IControlMin } from "../../Control/control";

class ObserverMin implements IControlMin {

  minMargin: number = null;

  SetMinMargin(minMargin: number) {
    this.minMargin = minMargin;
  }

}

describe('Class MinMargin', () => {

  const observerMin = new ObserverMin();
  const minMargin = new MinMargin([observerMin]);
  const observerDelete = new ObserverMin();

  test('minMargin.AddMinMarginObserver(minValue: IControlMin) Добавляет наблюдателя за минимальным отступом', () => {
    minMargin.AddMinMarginObserver(observerDelete);
    minMargin.AddMinMarginObserver(new ObserverMin);
    expect(minMargin.GetObserver().length).toEqual(3);
  });

  test('minMargin.DeleteMinMarginObserver(minValue: IControlMin) Удаляет наблюдателя за минимальным отступом', () => {
    minMargin.DeleteMinMarginObserver(observerDelete);
    minMargin.DeleteMinMarginObserver(observerDelete);
    expect(minMargin.GetObserver().length).toEqual(2);
  });

  test('minMargin.SetCoordinatePercent(coordinatePercent: number) Делегирует методу наблюдателя отступ в процентах', () => {
    minMargin.SetCoordinatePercent(.2);
    expect(observerMin.minMargin).toEqual(.2);
  });
});