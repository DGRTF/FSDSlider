require('jsdom-global')();

import ControlFacade from "../../Control/controlFacade";
import HandleX from "../../Control/controlHandleX";
import { IControlObserverCoordinate } from "../../Control/control";
import ScaleSetMargin from "../../Control/scaleSetMargin";

jest.mock("../../Control/controlHandleX");

class Observer implements IControlObserverCoordinate {
  setCoordinatePercent(coordinate: number) { }
}


beforeEach(() => {
  (HandleX as jest.Mock<HandleX>).mockClear();
});

let parentElement = document.createElement("div");

Object.defineProperties(parentElement, {
  offsetWidth: {
    get() { return parseFloat("200px") || 0 }
  },
})

let controlFacade: ControlFacade;
let handleX: HandleX;
let scale: ScaleSetMargin;
let observer: IControlObserverCoordinate = new Observer();

describe('Class ControlFacade', () => {

  test('ControlFacade.SetCoordinatePercent(percent: number, item: number) задаёт отступ по входному процентному значению (от 0 до 1) элементу item', () => {
    controlFacade = new ControlFacade(parentElement);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[0];
    controlFacade.setCurrentMarginPercent(.5, 0)
    expect(handleX.setCurrentMarginPercent).toHaveBeenCalledWith(.5);

    controlFacade = new ControlFacade(parentElement, true, true);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[1];
    controlFacade.setCurrentMarginPercent(.3, 0);
    expect(handleX.setCurrentMarginPercent).toHaveBeenCalledWith(.3);

    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[2];
    controlFacade.setCurrentMarginPercent(.6, 1)
    expect(handleX.setCurrentMarginPercent).toHaveBeenCalledWith(.6);
  });

  test('AddObserverHandle(observer: IControlObserverCoordinate, numb: number) задаёт наблюдателя элементу item', () => {
    controlFacade = new ControlFacade(parentElement);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[0];
    controlFacade.addObserverHandle(observer, 0)
    expect(handleX.addObserver).toHaveBeenCalledWith(observer);

    controlFacade = new ControlFacade(parentElement, true, true);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[1];
    controlFacade.addObserverHandle(observer, 0)
    expect(handleX.addObserver).toHaveBeenCalledWith(observer);

    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[2];
    controlFacade.addObserverHandle(observer, 1)
    expect(handleX.addObserver).toHaveBeenCalledWith(observer);
  });

  test('DeleteObserverHandle(observer: IControlObserverCoordinate, numb: number) удаляет наблюдателя элемента item', () => {
    controlFacade = new ControlFacade(parentElement);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[0];
    controlFacade.addObserverHandle(observer, 0)

    controlFacade.deleteObserverHandle(observer, 0)
    expect(handleX.deleteObserver).toHaveBeenCalledWith(observer);

    controlFacade = new ControlFacade(parentElement, true, true);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[1];
    controlFacade.addObserverHandle(observer, 0)

    controlFacade.deleteObserverHandle(observer, 0)
    expect(handleX.deleteObserver).toHaveBeenCalledWith(observer);

    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[2];
    controlFacade.addObserverHandle(observer, 1)
    controlFacade.deleteObserverHandle(observer, 1)
    expect(handleX.deleteObserver).toHaveBeenCalledWith(observer);
  });

});
