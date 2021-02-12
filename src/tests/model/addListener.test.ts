import AddListener from "../../Model/addListener";

class Func {
  str: string = "";

  listener(selectValue: string) {
    this.str = selectValue;
  }
}

it('ScaleSetMargin.ShowScale() показывает шкалу', () => {
  let str: string = "Yes";
  const func = new Func();
  const addListener = new AddListener(func.listener.bind(func));
  addListener.getValue(str);
  expect(func.str).toEqual("Yes");
});
