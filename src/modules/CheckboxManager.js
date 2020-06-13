export default class CheckboxManager {
  #parallelInput;
  #renderInput;

  constructor(parallelQuery, renderQuery) {
    this.#parallelInput = document.querySelector(parallelQuery);
    this.#renderInput = document.querySelector(renderQuery);
  }

  get parallel() {
    return this.#parallelInput.checked;
  }

  get render() {
    return this.#renderInput.checked;
  }
}
