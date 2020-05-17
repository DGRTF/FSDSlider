import { ModelNumber } from '../../Model/model';

describe('Class ModelNumber', () => {
  const modelNumber = new ModelNumber(-100, 100);

  test('ModelNumber.SetCoordinatePercent(percent: number) Получает процентное значение и задаёт свойству selectValue соответствующее значение', () => {
    let valuesPercent: number[] = [0, -10, 20, 80, 100, 120];
    let outputValues: number[] = [-100, -100, -60, 60, 100, 100];
    valuesPercent.forEach((el, index) => {
      modelNumber.SetCoordinatePercent(el);
      expect(modelNumber.GetSelectValue()).toEqual(`${outputValues[index]}`);
    });
  });

  test('ModelNumber.AddObserver(modelObserver: IModelObserver) Добавляет значение в массив', () => {
    modelNumber.AddObserver(null);
    modelNumber.AddObserver(null);
    modelNumber.AddObserver(null);
    expect(modelNumber.GetObserver().length).toEqual(3);
  });

  test('ModelNumber.DeleteObserver(modelObserver: IModelObserver) Удаляет значение из массива', () => {
    modelNumber.DeleteObserver(null);
    expect(modelNumber.GetObserver().length).toEqual(2);
  });

  test('ModelNumber.PercentInValue(selectValue: number) Получает значение и возвращает из него процентное', () => {
    let valuesPercent: number[] = [-10, -120, 20, 80, 100, 120];
    let outputValues: number[] = [45, null, 60, 90, 100, null];
    valuesPercent.forEach((el, index) => {
      let percent = modelNumber.PercentInValue(`${el}`);
      expect(percent).toEqual(outputValues[index]);
    });
  });
});
