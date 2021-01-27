import "./demo.scss";
import "./../../index.ts";


class Demo {
  constructor(
    { parentElement, minValue = -10000, maxValue = 10000, range = true, orientation = true }
  ) {
    this.range = range;
    this.orientation = orientation;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.parentElement = parentElement;
    this.slider;
    this.showCurrentValueMax;
    this.showCurrentValueMin;
    this.Init();
  }

  Init() {
    this.slider = $(this.parentElement).find('.parent');
    this.slider.RangeSliderInit({
      minValue: this.minValue, maxValue: this.maxValue, range: this.range, orientation: this.orientation
    });

    this.showCurrentValueMax = this.parentElement.querySelector(".js-max-select-value-one");
    this.showCurrentValueMin = this.parentElement.querySelector(".js-min-select-value-one");

    this._ShowCurrentValue();
    this._SetMinPossibleValue();
    this._SetMaxPossibleValue();
    this._SetMinValue();
    this._SetMaxValue();
    this._SetStep();
    this._ShowOrHiddenValue();
    this._ShowOrHiddenScale();
  }

  _ShowCurrentValue() {
    let str = this.slider.RangeSliderInit("GetSelectValue", 0);
    let strLast = this.slider.RangeSliderInit("GetSelectValue", 1);

    this.showCurrentValueMin.value = str;
    this.showCurrentValueMax.value = strLast;

    this.slider.RangeSliderInit("AddHandlerChangeValue", (selectValue) => {
      this.showCurrentValueMin.value = selectValue;
    }, 0);

    this.slider.RangeSliderInit("AddHandlerChangeValue", (selectValue) => {
      this.showCurrentValueMax.value = selectValue;
    }, 1);

  }

  _SetMinPossibleValue() {
    let minValueOne = this.parentElement.querySelector(".js-min-value-one");
    minValueOne.value = this.minValue;
    minValueOne.addEventListener("change", this._RangeSliderInitWrapperSetMinValue.bind(this));
  }

  _RangeSliderInitWrapperSetMinValue(element) {
    this.slider.RangeSliderInit("SetMinValue", Number(element.currentTarget.value));
  }

  _SetMaxPossibleValue() {
    let maxValueOne = this.parentElement.querySelector(".js-max-value-one");
    maxValueOne.value = this.maxValue;
    maxValueOne.addEventListener("change", this._RangeSliderInitWrapperSetMaxValue.bind(this));
  }

  _RangeSliderInitWrapperSetMaxValue(element) {
    this.slider.RangeSliderInit("SetMaxValue", Number(element.currentTarget.value));
  }

  _SetMinValue() {
    let minValue = this.parentElement.querySelector(".js-min-select-value-one");
    minValue.addEventListener("change", this._RangeSliderInitWrapperSetValueZero.bind(this));
  }

  _RangeSliderInitWrapperSetValueZero(element) {
    this.slider.RangeSliderInit("SetValue", Number(element.currentTarget.value), 0)
  }

  _SetMaxValue() {
    let maxValue = this.parentElement.querySelector(".js-max-select-value-one");
    maxValue.addEventListener("change", this._RangeSliderInitWrapperSetValueOne.bind(this));
  }

  _RangeSliderInitWrapperSetValueOne(element) {
    this.slider.RangeSliderInit("SetValue", Number(element.currentTarget.value), 1)
  }

  _SetStep() {
    let step = this.parentElement.querySelector(".js-step-one");
    step.addEventListener("change", this._changeHandler.bind(this));
  }

  _changeHandler(element) {
    this.slider.RangeSliderInit("SetStep", Number(element.currentTarget.value));
    this.showCurrentValueMax.step = element.currentTarget.value;
    this.showCurrentValueMin.step = element.currentTarget.value;
  }

  _rangeSliderInitWrapper(method, element) {
    this.slider.RangeSliderInit(method, Number(element.currentTarget.value))
  }

  _ShowOrHiddenValue() {
    let check = this.parentElement.querySelectorAll(".checkbox__input");

    check.forEach((el, index) => {
      el.addEventListener("click", this._clickHandler.bind(this, el, index));
    });
  }

  _clickHandler(checkBox, index) {
    if (checkBox.checked) {
      this.slider.RangeSliderInit("HiddenValue", index);
    } else {
      this.slider.RangeSliderInit("ShowValue", index);
    }
  }

  _ShowOrHiddenScale() {
    let check = this.parentElement.querySelectorAll(".checkbox__input")[2];
    check.addEventListener("click", this._checkBoxHideScaleClickHandler.bind(this));
  }

  _checkBoxHideScaleClickHandler(event) {
    if (event.target.checked) {
      this.slider.RangeSliderInit("HideScale");
    } else {
      this.slider.RangeSliderInit("ShowScale");
    }
  }

}

let parent = document.querySelectorAll(".slider");

parent.forEach((el, item) => {
  if (item === 0) {
    new Demo({ parentElement: el, range: false });
  }
  else {
    if (item === 1) {
      new Demo({ parentElement: el, orientation: false });
    } else {
      new Demo({ parentElement: el });
    }
  }
});
