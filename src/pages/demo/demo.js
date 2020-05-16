import "./../../index.ts";
import "./demo.scss";


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
      str = selectValue;
      this.showCurrentValueMin.value = str;
    }, 0);

    this.slider.RangeSliderInit("AddHandlerChangeValue", (selectValue) => {
      strLast = selectValue;
      this.showCurrentValueMax.value = strLast;
    }, 1);

  }

  _SetMinPossibleValue() {
    let minValueOne = this.parentElement.querySelector(".js-min-value-one");
    minValueOne.value = this.minValue;
    minValueOne.addEventListener("change", (element) => {
      this.slider.RangeSliderInit("SetMinValue", Number(element.currentTarget.value));
    });
  }

  _SetMaxPossibleValue() {
    let maxValueOne = this.parentElement.querySelector(".js-max-value-one");
    maxValueOne.value = this.maxValue;
    maxValueOne.addEventListener("change", (element) => {
      this.slider.RangeSliderInit("SetMaxValue", Number(element.currentTarget.value));
    });
  }

  _SetMinValue() {
    let minValue = this.parentElement.querySelector(".js-min-select-value-one");
    minValue.addEventListener("change", (element) => {
      this.slider.RangeSliderInit("SetValue", Number(element.currentTarget.value), 0);
    });
  }

  _SetMaxValue() {
    let maxValue = this.parentElement.querySelector(".js-max-select-value-one");
    maxValue.addEventListener("change", (element) => {
      this.slider.RangeSliderInit("SetValue", Number(element.currentTarget.value), 1);
    });
  }

  _SetStep() {
    let step = this.parentElement.querySelector(".js-step-one");
    step.addEventListener("change", (element) => {
      this.slider.RangeSliderInit("SetStep", Number(element.currentTarget.value));
      this.showCurrentValueMax.step = element.currentTarget.value;
      this.showCurrentValueMin.step = element.currentTarget.value;
    });
  }

  _ShowOrHiddenValue() {
    let check = this.parentElement.querySelectorAll(".checkbox__label_move");

    check.forEach((el, index) => {
      let change = true;
      el.addEventListener("click", () => {
        if (change) {
          this.slider.RangeSliderInit("HiddenValue", index);
          change = false;
        } else {
          this.slider.RangeSliderInit("ShowValue", index);
          change = true;
        }
      });
    });

  }

  _ShowOrHiddenScale() {
    let check = this.parentElement.querySelectorAll(".checkbox__label_move")[2];

    let change = true;
    check.addEventListener("click", () => {
        if (change) {
          this.slider.RangeSliderInit("HideScale");
          change = false;
        } else {
          this.slider.RangeSliderInit("ShowScale");
          change = true;
        }
      });

  }
}

let parent = document.querySelectorAll(".slider");

parent.forEach((el, item) => {
  if (item === 0) {
    new Demo({ parentElement: el, range: false });
  }
  else {
    if (item === 1) {
      new Demo({ parentElement: el, orientation: false});
    } else {
      new Demo({ parentElement: el });
    }
  }
});
