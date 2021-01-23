import AddListener from "../../Model/AddListener";

class Func {
  str: string = "";

  Listener(selectValue: string) {
    this.str = selectValue;
  }
}

it('ScaleSetMargin.ShowScale() показывает шкалу', () => {
  let str: string = "Yes";
  const func = new Func();
  const addListener = new AddListener(func.Listener.bind(func));
  addListener.GetValue(str);
  expect(func.str).toEqual("Yes");
});