import { IModelObserver } from "./model";

// Обертка над обработчиком события в виде класса
// Далее эту обертку можно использовать для любого класса,
// добавляющего слушателя с интерфейсом IModelObserver
export default class AddListener implements IModelObserver {
  constructor(listener: (selectValue: string) => void) {
    this.listener = listener;
  }

  private listener: (selectValue: string) => void;

  getValue(selectValue: string) {
    this.listener(selectValue);
  }

}
