jest.mock("../../Control/controlHandleX");

import { ModelNumber, IModelObserver } from '../../Model/model';



class Observer implements IModelObserver {
  str: string;

  getValue(selectValue: string) {
    this.str = selectValue;
  }
}

describe('Class ModelNumber', () => {

  function getModelNumber() {
    return new ModelNumber(-100, 100);
  }


  test('ModelNumber.SetCoordinatePercent(percent: number) Получает процентное значение и задаёт свойству selectValue соответствующее значение', () => {
    const modelNumber = getModelNumber();
    const valuesPercent: number[] = [0, 1, -.2, .8, 1.2];
    const outputValues: number[] = [-100, 100, -100, 60, 100];

    valuesPercent.forEach((el, index) => {
      modelNumber.setCoordinatePercent(el);
      expect(modelNumber.getSelectValue()).toEqual(`${outputValues[index]}`);
    });
  });

  test('ModelNumber.AddObserver(modelObserver: IModelObserver) Добавляет значение в массив', () => {
    const modelNumber = getModelNumber();
    modelNumber.addObserver(null);
    modelNumber.addObserver(null);
    modelNumber.addObserver(null);

    const length = modelNumber.getObserverLength();
    expect(length).toEqual(3);
  });

  test('ModelNumber.DeleteObserver(modelObserver: IModelObserver) Удаляет значение из массива', () => {
    const modelNumber = getModelNumber();
    modelNumber.addObserver(null);
    modelNumber.addObserver(null);
    modelNumber.addObserver(null)

    modelNumber.deleteObserver(null);
    const length = modelNumber.getObserverLength();
    expect(length).toEqual(2);
  });

  test('ModelNumber.PercentInValue(selectValue: number) Получает значение и возвращает из него процентное', () => {
    const modelNumber = getModelNumber();
    const valuesPercent: number[] = [-10, -120, 20, 80, 100, 120];
    const outputValues: number[] = [.45, null, .6, .9, 1, null];

    valuesPercent.forEach((el, index) => {
      const percent = modelNumber.getPercentFromValue(`${el}`);
      expect(percent).toEqual(outputValues[index]);
    });
  });

  test('ModelNumber.SetStep(step: number) задаёт шаг', () => {
    const modelNumber = getModelNumber();
    const valuesStep: number[] = [-120, -100, -20, 100, 80, 120];
    const outputValues: number[] = [1, -100, -20, 100, 80, 80];

    valuesStep.forEach((el, item) => {
      modelNumber.setStep(el);
      const step = modelNumber.getStep();
      expect(step).toEqual(outputValues[item]);
    });
  });

  test('ModelNumber.SetMinValue(minValue: number) минимальное значение', () => {
    const modelNumber = getModelNumber();
    const inputValues: number[] = [-120, -20, 100, 80, 120];
    const outputValues: number[] = [-120, -20, 100, 80, 80];

    inputValues.forEach((el, item) => {
      modelNumber.setMinValue(el);
      const minValue = modelNumber.getMinValue();
      expect(minValue).toEqual(outputValues[item]);
    });
  });

  test('ModelNumber.SetMaxValue(maxValue: number) максимальное значение', () => {
    const modelNumber = getModelNumber();
    const inputValues: number[] = [-120, -100, 100, 80, 120];
    const outputValues: number[] = [100, -100, 100, 80, 120];

    inputValues.forEach((el, item) => {
      modelNumber.setMaxValue(el);
      const maxValue = modelNumber.getMaxValue();
      expect(maxValue).toEqual(outputValues[item]);
    });
  });

  test('ModelNumber.ValueInPercent(percent: number): string максимальное значение', () => {
    const modelNumber = getModelNumber();
    const inputValues: number[] = [-120, 0, 1, .8, 120];
    const outputValues: number[] = [null, -100, 100, 60, null];

    inputValues.forEach((el, item) => {
      const percent = modelNumber.getValueFromPercent(el);
      expect(`${percent}`).toEqual(`${outputValues[item]}`);
    });
  });

  test('ModelNumber.Notify() уведомляет наблюдателей', () => {
    const modelNumber = getModelNumber();
    const observer = new Observer();

    modelNumber.addObserver(observer)
    modelNumber.setCoordinatePercent(.5);
    modelNumber.notify();

    expect(observer.str).toEqual("0");
  });

});
