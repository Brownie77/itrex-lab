export default class QueueView {
  constructor() {
    this.queueDisplay = document.getElementById('placeholder') || null;
    this.queueInput = document.getElementById('name') || null;
    this.ttl = document.getElementById('set-ttl') || null;
    this.checkbox = document.getElementById('use-default-TTL-check') || null;
  }

  getCurrentlyDisplayedPatient() {
    return this.queueDisplay.textContent.toUpperCase();
  }

  getNameFromInputAndClearInput() {
    const name = this.queueInput.value;
    this.queueInput.value = '';
    return name.toUpperCase();
  }

  setCurrentlyDisplayedPatient(name) {
    this.queueDisplay.textContent = name;
    return this;
  }
}
