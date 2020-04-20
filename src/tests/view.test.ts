import { View } from "../View/view";
require('jsdom-global')();

describe("Class View", () => {

    let parentElement = document.createElement("div");
    let view = new View(parentElement);

    test("ModelNumber Получает строковое значение и задаёт его ", () => {
        view.GetValue("gena");
        let viewElement = <HTMLElement>parentElement.firstChild;
        expect(viewElement.innerText).toEqual("gena");
    });
});