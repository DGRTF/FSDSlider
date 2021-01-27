jest.mock("../../Control/controlHandleX");

import { ModelNumber, IModelObserver } from '../../Model/model';



class Observer implements IModelObserver {
  str: string;

  GetValue(selectValue: string) {
    this.str = selectValue;
  }
}

describe('Class ModelNumber', () => {

  function FactoryModelNumber() {
    return new ModelNumber(-100, 100);
  }


  test('ModelNumber.SetCoordinatePercent(percent: number) Получает процентное значение и задаёт свойству selectValue соответствующее значение', () => {
    const modelNumber = FactoryModelNumber();
    const valuesPercent: number[] = [0, 1, -.2, .8, 1.2];
    const outputValues: number[] = [-100, 100, -100, 60, 100];

    valuesPercent.forEach((el, index) => {
      modelNumber.SetCoordinatePercent(el);
      expect(modelNumber.GetSelectValue()).toEqual(`${outputValues[index]}`);
    });
  });

  test('ModelNumber.AddObserver(modelObserver: IModelObserver) Добавляет значение в массив', () => {
    const modelNumber = FactoryModelNumber();
    modelNumber.AddObserver(null);
    modelNumber.AddObserver(null);
    modelNumber.AddObserver(null);

    const length = modelNumber.GetObserverLength();
    expect(length).toEqual(3);
  });

  test('ModelNumber.DeleteObserver(modelObserver: IModelObserver) Удаляет значение из массива', () => {
    const modelNumber = FactoryModelNumber();
    modelNumber.AddObserver(null);
    modelNumber.AddObserver(null);
    modelNumber.AddObserver(null)

    modelNumber.DeleteObserver(null);
    const length = modelNumber.GetObserverLength();
    expect(length).toEqual(2);
  });

  test('ModelNumber.PercentInValue(selectValue: number) Получает значение и возвращает из него процентное', () => {
    const modelNumber = FactoryModelNumber();
    const valuesPercent: number[] = [-10, -120, 20, 80, 100, 120];
    const outputValues: number[] = [.45, null, .6, .9, 1, null];

    valuesPercent.forEach((el, index) => {
      const percent = modelNumber.PercentInValue(`${el}`);
      expect(percent).toEqual(outputValues[index]);
    });
  });

  test('ModelNumber.SetStep(step: number) задаёт шаг', () => {
    const modelNumber = FactoryModelNumber();
    const valuesStep: number[] = [-120, -100, -20, 100, 80, 120];
    const outputValues: number[] = [1, -100, -20, 100, 80, 80];

    valuesStep.forEach((el, item) => {
      modelNumber.SetStep(el);
      const step = modelNumber.GetStep();
      expect(step).toEqual(outputValues[item]);
    });
  });

  test('ModelNumber.SetMinValue(minValue: number) минимальное значение', () => {
    const modelNumber = FactoryModelNumber();
    const inputValues: number[] = [-120, -20, 100, 80, 120];
    const outputValues: number[] = [-120, -20, 100, 80, 80];

    inputValues.forEach((el, item) => {
      modelNumber.SetMinValue(el);
      const minValue = modelNumber.GetMinValue();
      expect(minValue).toEqual(outputValues[item]);
    });
  });

  test('ModelNumber.SetMaxValue(maxValue: number) максимальное значение', () => {
    const modelNumber = FactoryModelNumber();
    const inputValues: number[] = [-120, -100, 100, 80, 120];
    const outputValues: number[] = [100, -100, 100, 80, 120];

    inputValues.forEach((el, item) => {
      modelNumber.SetMaxValue(el);
      const maxValue = modelNumber.GetMaxValue();
      expect(maxValue).toEqual(outputValues[item]);
    });
  });

  test('ModelNumber.ValueInPercent(percent: number): string максимальное значение', () => {
    const modelNumber = FactoryModelNumber();
    const inputValues: number[] = [-120, 0, 1, .8, 120];
    const outputValues: number[] = [null, -100, 100, 60, null];

    inputValues.forEach((el, item) => {
      const percent = modelNumber.ValueInPercent(el);
      expect(`${percent}`).toEqual(`${outputValues[item]}`);
    });
  });

  test('ModelNumber.Notify() уведомляет наблюдателей', () => {
    const modelNumber = FactoryModelNumber();
    const observer = new Observer();

    modelNumber.AddObserver(observer)
    modelNumber.SetCoordinatePercent(.5);
    modelNumber.Notify();

    expect(observer.str).toEqual("0");
  });

});
