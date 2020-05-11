import { IModelObserver } from "./model";

export class AddListener implements IModelObserver {
  constructor(listener: (selectValue: string) => void) {
    this.listener = listener;
  }

  listener: (selectValue: string) => void;

  GetValue(selectValue: string) {
    this.listener(selectValue);
  }

}