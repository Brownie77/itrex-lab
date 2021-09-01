export default class QueueView {
  constructor() {
    this.position = document.getElementById('position') || null;
    this.queueDisplay = document.getElementById('placeholder') || null;
  }

  getCurrentlyDisplayedPatient() {
    return this.queueDisplay.textContent;
  }

  setPosition(position) {
    this.position.textContent = position;
    return this;
  }

  getNameFromInputAndClearInput() {
    const name = this.queueInput.value;
    this.queueInput.value = '';
    return name;
  }

  setCurrentlyDisplayedPatient(name) {
    this.queueDisplay.textContent = name;
    return this;
  }
}
