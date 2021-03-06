require('jsdom-global')();

import ProgressLast from "../../Control/progressLast";



describe('Class ProgressLast', () => {

  let parentElement = document.createElement("div");

  Object.defineProperties(parentElement, {
    offsetWidth: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  const progressLast = new ProgressLast(parentElement);

  test('ProgressLast.SetCoordinatePercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 1)', () => {
    let valuesPercent: number[] = [0, -.1, .2, -.8, 1.2, 1];
    let outputValues: number[] = [200, 200, 160, 160, 160, 0];
    valuesPercent.forEach((el, index) => {
      progressLast.setCoordinatePercent(el);
      expect(progressLast.getWidthOrHeight()).toEqual(`${outputValues[index]}px`);
    });
  });


  // For vertical orientation
  let parentElementVertical = document.createElement("div");

  Object.defineProperties(parentElementVertical, {
    offsetHeight: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  const progressLastVertical = new ProgressLast(parentElementVertical, false, false);

  test('ProgressLast.SetCoordinatePercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 1)', () => {
    let valuesPercent: number[] = [0, -.1, .2, -.8, 1.2, 1];
    let outputValues: number[] = [0, 0, 40, 40, 40, 200];
    valuesPercent.forEach((el, index) => {
      progressLastVertical.setCoordinatePercent(el);
      expect(progressLastVertical.getWidthOrHeight()).toEqual(`${outputValues[index]}px`);
    });
  });

});
