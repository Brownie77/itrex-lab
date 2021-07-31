export default class QueueView {
  constructor() {
    this.queueDisplay = $('#placeholder') || null;
    this.queueInput = $('#name') || null;
  }

  getCurrentlyDisplayedPatient() {
    return this.queueDisplay.text().toUpperCase();
  }

  getNameFromInput() {
    const name = this.queueInput.val();
    this.queueInput.val('');
    return name.toUpperCase();
  }

  setCurrentlyDisplayedPatient(name) {
    const value = name ? name : '<empty>';
    this.queueDisplay.contents()[0].data = value;
  }
}
