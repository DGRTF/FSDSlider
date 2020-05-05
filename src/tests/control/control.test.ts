// import { HandleX } from '../../Control/control';
// import { ModelNumber } from '../../Model/model';
// import { View } from '../../View/view';

// require('jsdom-global')();

// describe('Class HandleX', () => {
//   const parentElement = document.createElement('div');
//   parentElement.style.width = '100px';
//   // parentElement.style.position="relative";
//   const model = new ModelNumber(-100, 100);
//   const view = new View(parentElement);

//   const viewArr: View[] = [];
//   viewArr.push(view);

//   const handle = new HandleX(parentElement, viewArr);

//   const handleElement = <HTMLElement>parentElement.lastChild;
//   // console.warn(parentElement.offsetWidth);
//   // console.warn(handleElement.offsetWidth);

//   // test("ModelNumber Получает процентное значение и задаёт свойству selectValue соответствующее значение", () => {
//   //     handle.SetCurrentMarginPercent(50);
//   //     expect(viewElement.style.left).toEqual(0);
//   // });

//   test('ModelNumber.SetCurrentMarginPercent() Получает процентное значение и задаёт свойству selectValue соответствующее значение', () => {
//     handle.SetCurrentMarginPercent(50);
//     expect(+model.selectValue).toEqual(0);
//     // expect(handleElement.style.left).toEqual(String(parentElement.offsetWidth * 0.5 - handleElement.offsetWidth * 0.5) + "px");
//   });

//   test('ModelNumber.SetCurrentMarginPercent() Получает процентное значение и задаёт свойству selectValue соответствующее значение', () => {
//     handle.SetCurrentMarginPercent(50);
//     expect(handleElement.style.left).toEqual(`${String(parentElement.offsetWidth * 0.5 - handleElement.offsetWidth * 0.5)}px`);
//   });


//   test('ModelNumber.SetCurrentMarginPercent() Получает процентное значение и задаёт свойству selectValue соответствующее значение', () => {
//     handle.SetCurrentMarginPercent(50);
//     expect(+model.selectValue).toEqual(0);
//     expect(handleElement.style.left).toEqual(`${String(parentElement.offsetWidth * 0.5 - handleElement.offsetWidth * 0.5)}px`);
//   });
// });
