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
    this.initialize();
  }

  initialize() {
    this.slider = $(this.parentElement).find('.parent');
    this.slider.RangeSliderInit({
      minValue: this.minValue, maxValue: this.maxValue, range: this.range, orientation: this.orientation
    });

    this.showCurrentValueMax = this.parentElement.querySelector(".js-max-select-value-one");
    this.showCurrentValueMin = this.parentElement.querySelector(".js-min-select-value-one");

    this._showCurrentValue();
    this._setMinPossibleValue();
    this._setMaxPossibleValue();
    this._setMinValue();
    this._setMaxValue();
    this._setStep();
    this._showOrHiddenValue();
    this._showOrHiddenScale();
  }

  _showCurrentValue() {
    let str = this.slider.RangeSliderInit("getSelectValue", 0);
    let strLast = this.slider.RangeSliderInit("getSelectValue", 1);

    this.showCurrentValueMin.value = str;
    this.showCurrentValueMax.value = strLast;

    this.slider.RangeSliderInit("addHandlerChangeValue", (selectValue) => {
      this.showCurrentValueMin.value = selectValue;
    }, 0);

    this.slider.RangeSliderInit("addHandlerChangeValue", (selectValue) => {
      this.showCurrentValueMax.value = selectValue;
    }, 1);

  }

  _setMinPossibleValue() {
    let minValueOne = this.parentElement.querySelector(".js-min-value-one");
    minValueOne.value = this.minValue;
    minValueOne.addEventListener("change", this._initRangeSliderWrapperSetMinValue.bind(this));
  }

  _initRangeSliderWrapperSetMinValue(element) {
    this.slider.RangeSliderInit("setMinValue", Number(element.currentTarget.value));
  }

  _setMaxPossibleValue() {
    let maxValueOne = this.parentElement.querySelector(".js-max-value-one");
    maxValueOne.value = this.maxValue;
    maxValueOne.addEventListener("change", this._initRangeSliderWrapperSetMaxValue.bind(this));
  }

  _initRangeSliderWrapperSetMaxValue(element) {
    this.slider.RangeSliderInit("setMaxValue", Number(element.currentTarget.value));
  }

  _setMinValue() {
    let minValue = this.parentElement.querySelector(".js-min-select-value-one");
    minValue.addEventListener("change", this._initRangeSliderWrapperSetValueZero.bind(this));
  }

  _initRangeSliderWrapperSetValueZero(element) {
    this.slider.RangeSliderInit("setValue", Number(element.currentTarget.value), 0)
  }

  _setMaxValue() {
    let maxValue = this.parentElement.querySelector(".js-max-select-value-one");
    maxValue.addEventListener("change", this._initRangeSliderWrapperSetValueOne.bind(this));
  }

  _initRangeSliderWrapperSetValueOne(element) {
    this.slider.RangeSliderInit("setValue", Number(element.currentTarget.value), 1)
  }

  _setStep() {
    let step = this.parentElement.querySelector(".js-step-one");
    step.addEventListener("change", this._changeHandler.bind(this));
  }

  _changeHandler(element) {
    this.slider.RangeSliderInit("setStep", Number(element.currentTarget.value));
    this.showCurrentValueMax.step = element.currentTarget.value;
    this.showCurrentValueMin.step = element.currentTarget.value;
  }

  _initRangeSliderWrapper(method, element) {
    this.slider.RangeSliderInit(method, Number(element.currentTarget.value))
  }

  _showOrHiddenValue() {
    let check = this.parentElement.querySelectorAll(".checkbox__input");

    check.forEach((el, index) => {
      el.addEventListener("click", this._clickHandler.bind(this, el, index));
    });
  }

  _clickHandler(checkBox, index) {
    if (checkBox.checked) {
      this.slider.RangeSliderInit("hiddenValue", index);
    } else {
      this.slider.RangeSliderInit("showValue", index);
    }
  }

  _showOrHiddenScale() {
    let check = this.parentElement.querySelectorAll(".checkbox__input")[2];
    check.addEventListener("click", this._checkBoxHideScaleClickHandler.bind(this));
  }

  _checkBoxHideScaleClickHandler(event) {
    if (event.target.checked) {
      this.slider.RangeSliderInit("hideScale");
    } else {
      this.slider.RangeSliderInit("showScale");
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
