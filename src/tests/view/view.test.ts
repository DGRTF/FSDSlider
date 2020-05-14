import { View } from '../../View/view';

require('jsdom-global')();

describe('Class View', () => {
  const parentElement = document.createElement('div');

  Object.defineProperties(parentElement, {
    offsetWidth: {
      get() { return parseFloat('200px') || 0; },
    },
  });

  const view = new View(parentElement);
  const viewElement = <HTMLElement>parentElement.firstChild;

  test('View.GetValue() Получает строковое значение и задаёт его HTML-элементу', () => {
    view.GetValue('gena');
    expect(viewElement.innerText).toEqual('gena');
  });

  test('View.HiddenView() Показывает HTML-элемент', () => {
    view.HiddenView();
    expect(viewElement.hidden).toEqual(true);
  });

  test('View.ShowView() Скрывает HTML-элемент ', () => {
    view.ShowView();
    expect(viewElement.hidden).toEqual(false);
  });

  test('View.SetCoordinate(coordinate: number) Задаёт отступ HTML-элемента ', () => {
    const valuesArr: number[] = [0, -10, 20, 100, 30, 101];
    const answerArr: number[] = [0, 0, 40, 200, 60, 60];
    valuesArr.forEach((el, index) => {
      view.SetCoordinatePercent(el);
      expect(viewElement.style.left).toEqual(`${answerArr[index]}px`);
    });
  });


  const parentElementVertical = document.createElement('div');

  Object.defineProperties(parentElementVertical, {
    offsetHeight: {
      get() { return parseFloat('200px') || 0; },
    },
  });

  const viewVertical = new View(parentElementVertical, false);
  const viewElementVertical = <HTMLElement>parentElementVertical.firstChild;
  test('View.SetCoordinate(coordinate: number) Задаёт отступ HTML-элемента для вертикального расположения', () => {
    const valuesArr: number[] = [100, -10, 20, 100, 30, 101];
    const answerArr: number[] = [0, 0, 160, 0, 140, 140];
    valuesArr.forEach((el, index) => {
      viewVertical.SetCoordinatePercent(el);
      expect(viewElementVertical.style.top).toEqual(`${answerArr[index]}px`);
    });
  });
});
