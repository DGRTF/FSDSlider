import { ModelNumber } from "../Model/model"

describe("Class ModelNumber", () => {

    let modelNumber = new ModelNumber(0, 100);

    test("ModelNumber Получает процентное значение и задаёт свойству selectValue соответствующее значение", () => {
        modelNumber.SetSelectValue(50);
        expect(modelNumber.selectValue).toEqual("50");
    });

    test("ModelNumber Добавляет значение в массив", () => {
        modelNumber.AddObserver(null);
        modelNumber.AddObserver(null);
        modelNumber.AddObserver(null);
        expect(modelNumber.observer.length).toEqual(3);
    });

    test("ModelNumber Удаляет значение из массива", () => {
        modelNumber.DeleteObserver(null);
        expect(modelNumber.observer.length).toEqual(2);
    });
});