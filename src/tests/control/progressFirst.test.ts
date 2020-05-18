import ProgressFirst from "../../Control/progressFirst";

require('jsdom-global')();


describe('Class ProgressFirst', () => {

  let parentElement = document.createElement("div");

  Object.defineProperties(parentElement, {
    offsetWidth: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  const progressFirst = new ProgressFirst(parentElement);

  test('ProgressFirst.SetCoordinatePercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 100)', () => {
    let valuesPercent: number[] = [0, -.1, .2, -.8, 1.2, 1];
    let outputValues: number[] = [0, 0, 40, 40, 40, 200];
    valuesPercent.forEach((el, index) => {
      progressFirst.SetCoordinatePercent(el);
      expect(progressFirst.GetWidthOrHeight()).toEqual(`${outputValues[index]}px`);
    });
  });


  // For vertical orientation
  let parentElementVertical = document.createElement("div");

  Object.defineProperties(parentElementVertical, {
    offsetHeight: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  const progressFirstVertical = new ProgressFirst(parentElementVertical, false);

  test('ProgressFirst.SetCoordinatePercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 100)', () => {
    let valuesPercent: number[] = [0, -.1, .2, -.8, 1.2, 1];
    let outputValues: number[] = [200, 200, 160, 160, 160, 0];
    valuesPercent.forEach((el, index) => {
      progressFirstVertical.SetCoordinatePercent(el);
      expect(progressFirstVertical.GetWidthOrHeight()).toEqual(`${outputValues[index]}px`);
    });
  });

});
