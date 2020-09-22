import ControlFacade from "../../Control/controlFacade";
import HandleX from "../../Control/controlHandleX";
import { IControlObserverCoordinate } from "../../Control/control";
import ScaleSetMargin from "../../Control/scaleSetMargin";

require('jsdom-global')();
jest.mock("../../Control/controlHandleX");

class Observer implements IControlObserverCoordinate {
  SetCoordinatePercent(coordinate: number) { }
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
    controlFacade.SetCurrentMarginPercent(.5, 0)
    expect(handleX.SetCurrentMarginPercent).toHaveBeenCalledWith(.5);

    controlFacade = new ControlFacade(parentElement, true, true);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[1];
    controlFacade.SetCurrentMarginPercent(.3, 0);
    expect(handleX.SetCurrentMarginPercent).toHaveBeenCalledWith(.3);

    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[2];
    controlFacade.SetCurrentMarginPercent(.6, 1)
    expect(handleX.SetCurrentMarginPercent).toHaveBeenCalledWith(.6);
  });

  test('AddObserverHandle(observer: IControlObserverCoordinate, numb: number) задаёт наблюдателя элементу item', () => {
    controlFacade = new ControlFacade(parentElement);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[0];
    controlFacade.AddObserverHandle(observer, 0)
    expect(handleX.AddObserver).toHaveBeenCalledWith(observer);

    controlFacade = new ControlFacade(parentElement, true, true);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[1];
    controlFacade.AddObserverHandle(observer, 0)
    expect(handleX.AddObserver).toHaveBeenCalledWith(observer);

    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[2];
    controlFacade.AddObserverHandle(observer, 1)
    expect(handleX.AddObserver).toHaveBeenCalledWith(observer);
  });

  test('DeleteObserverHandle(observer: IControlObserverCoordinate, numb: number) удаляет наблюдателя элемента item', () => {
    controlFacade = new ControlFacade(parentElement);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[0];
    controlFacade.AddObserverHandle(observer, 0)

    controlFacade.DeleteObserverHandle(observer, 0)
    expect(handleX.DeleteObserver).toHaveBeenCalledWith(observer);

    controlFacade = new ControlFacade(parentElement, true, true);
    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[1];
    controlFacade.AddObserverHandle(observer, 0)

    controlFacade.DeleteObserverHandle(observer, 0)
    expect(handleX.DeleteObserver).toHaveBeenCalledWith(observer);

    handleX = (HandleX as jest.Mock<HandleX>).mock.instances[2];
    controlFacade.AddObserverHandle(observer, 1)
    controlFacade.DeleteObserverHandle(observer, 1)
    expect(handleX.DeleteObserver).toHaveBeenCalledWith(observer);
  });

});
