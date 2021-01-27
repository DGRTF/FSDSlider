import MinMargin from "../../Control/controlMinMargin";
import { IControlMin } from "../../Control/control";

class ObserverMin implements IControlMin {

  minMargin: number = null;

  setMinMargin(minMargin: number) {
    this.minMargin = minMargin;
  }

}

describe('Class MinMargin', () => {

  const observerMin = new ObserverMin();
  const minMargin = new MinMargin([observerMin]);
  const observerDelete = new ObserverMin();

  test('minMargin.AddMinMarginObserver(minValue: IControlMin) Добавляет наблюдателя за минимальным отступом', () => {
    minMargin.addMinMarginObserver(observerDelete);
    minMargin.addMinMarginObserver(new ObserverMin);
    expect(minMargin.getObserver().length).toEqual(3);
  });

  test('minMargin.DeleteMinMarginObserver(minValue: IControlMin) Удаляет наблюдателя за минимальным отступом', () => {
    minMargin.deleteMinMarginObserver(observerDelete);
    minMargin.deleteMinMarginObserver(observerDelete);
    expect(minMargin.getObserver().length).toEqual(2);
  });

  test('minMargin.SetCoordinatePercent(coordinatePercent: number) Делегирует методу наблюдателя отступ в процентах', () => {
    minMargin.setCoordinatePercent(.2);
    expect(observerMin.minMargin).toEqual(.2);
  });
});