import { IModelObserver } from "./model";

export default class AddListener implements IModelObserver {
  constructor(listener: (selectValue: string) => void) {
    this.listener = listener;
  }

  private listener: (selectValue: string) => void;

  GetValue(selectValue: string) {
    this.listener(selectValue);
  }

}