import ProgressLast from "../../Control/progressLast";

require('jsdom-global')();


describe('Class ProgressLast', () => {

  let parentElement = document.createElement("div");

  Object.defineProperties(parentElement, {
    clientWidth: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  const progressLast = new ProgressLast(parentElement);

  test('ProgressLast.SetCoordinatePercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 100)', () => {
    let valuesPercent: number[] = [0, -10, 20, 80, 100, 120];
    let outputValues: number[] = [200, 200, 160, 40, 0, 0];
    valuesPercent.forEach((el, index) => {
      progressLast.SetCoordinatePercent(el);
      expect(progressLast.GetWidthOrHeight()).toEqual(`${outputValues[index]}px`);
    });
  });


  // For vertical orientation
  let parentElementVertical = document.createElement("div");

  Object.defineProperties(parentElementVertical, {
    clientHeight: {
      get() { return parseFloat("200px") || 0 }
    },
  })

  const progressLastVertical = new ProgressLast(parentElementVertical, false);

  test('ProgressLast.SetCoordinatePercent(percent: number) задаёт отступ по входному процентному значению (от 0 до 100)', () => {
    let valuesPercent: number[] = [0, -10, 20, 80, 100, 120];
    let outputValues: number[] = [0, 0, 40, 160, 200, 200];
    valuesPercent.forEach((el, index) => {
      progressLastVertical.SetCoordinatePercent(el);
      expect(progressLastVertical.GetWidthOrHeight()).toEqual(`${outputValues[index]}px`);
    });
  });

});
