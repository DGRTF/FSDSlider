import "./../../index.ts";
import "./demo.scss";

let i = $('.parent').RangeSliderInit({
  minValue: -10000, maxValue: 10000, range: true
});

let showCurrentValueMax = document.querySelector(".js-max-select-value-one");
let showCurrentValueMin = document.querySelector(".js-min-select-value-one");

function ShowCurrentValue() {
  let str = $('.parent').RangeSliderInit("GetSelectValue", 0);
  let strLast = $('.parent').RangeSliderInit("GetSelectValue", 1);

  showCurrentValueMin.value = str;
  showCurrentValueMax.value = strLast;

  $('.parent').RangeSliderInit("AddHandlerChangeValue", (selectValue) => {
    str = selectValue;
    showCurrentValueMin.value = str;
  }, 0);

  $('.parent').RangeSliderInit("AddHandlerChangeValue", (selectValue) => {
    strLast = selectValue;
    showCurrentValueMax.value = strLast;
  }, 1);
  
}
ShowCurrentValue();

function SetMinPossibleValue() {
  let minValueOne = document.querySelector(".js-min-value-one");
  minValueOne.addEventListener("change", (element) => {
    i.RangeSliderInit("SetMinValue", Number(element.currentTarget.value));
  });
}
SetMinPossibleValue();

function SetMaxPossibleValue() {
  let maxValueOne = document.querySelector(".js-max-value-one");
  maxValueOne.addEventListener("change", (element) => {
    i.RangeSliderInit("SetMaxValue", Number(element.currentTarget.value));
  });
}
SetMaxPossibleValue();

function SetMinValue() {
  let minValue = document.querySelector(".js-min-select-value-one");
  minValue.addEventListener("change", (element) => {
    i.RangeSliderInit("SetValue", Number(element.currentTarget.value), 0);
  });
}
SetMinValue();

function SetMaxValue() {
  let maxValue = document.querySelector(".js-max-select-value-one");
  maxValue.addEventListener("change", (element) => {
    i.RangeSliderInit("SetValue", Number(element.currentTarget.value), 1);
  });
}
SetMaxValue();

function SetStep() {
  let step = document.querySelector(".js-step-one");
  step.addEventListener("change", (element) => {
    i.RangeSliderInit("SetStep", Number(element.currentTarget.value));
    showCurrentValueMax.step = element.currentTarget.value;
    showCurrentValueMin.step = element.currentTarget.value;
  });
}
SetStep();

function ShowOrHiddenValue() {
  let check = document.querySelectorAll(".checkbox__label_move");

  check.forEach((el, index) => {
    let change = true;
    el.addEventListener("click", () => {
      if (change) {
        i.RangeSliderInit("HiddenValue", index);
        change = false;
      } else {
        i.RangeSliderInit("ShowValue", index);
        change = true;
      }
    });
  });

}
ShowOrHiddenValue();



let g = $('.parentY').RangeSliderInit({
  minValue: -1000, maxValue: 1000, orientation: false, range: true
});

$('.parentY').RangeSliderInit("SetStep", 10);

$('.parentY').RangeSliderInit("SetMaxValue", 990);

$('.parentY').RangeSliderInit("SetStep", 1);

$('.parentY').RangeSliderInit("SetValuePercent", 100, 1);


let r = $('.add-parent').RangeSliderInit({
  range: false
});