export default class QueueController {
  constructor(queueView, queueModel) {
    this.view = queueView;
    this.model = queueModel;

    this.EmptyQueueMsg = '<empty>';

    document.addEventListener('DOMContentLoaded', this.handleLoad.bind(this));
    document
      .getElementById('add-to-queue-btn')
      ?.addEventListener('click', this.handleAddToQueue.bind(this));
    document
      .getElementById('next-patient')
      ?.addEventListener('click', this.handleProcessCurrentPatient.bind(this));
  }

  async handleLoad() {
    const currentPatient = await this.model.getFirst();
    if (currentPatient) {
      this.view.setCurrentlyDisplayedPatient(currentPatient);
    }
  }

  async handleProcessCurrentPatient() {
    if (this.view.getCurrentlyDisplayedPatient() !== this.EmptyQueueMsg.toUpperCase()) {
      const newPatient = (await this.model.getNext()) || this.EmptyQueueMsg;
      this.view.setCurrentlyDisplayedPatient(newPatient);
    }
  }

  async handleAddToQueue() {
    const newPatient = this.view.getNameFromInputAndClearInput();
    if (newPatient) {
      await this.model.enqueue(newPatient);
      const currentPatient = await this.model.getFirst();
      this.view.setCurrentlyDisplayedPatient(currentPatient);
    }
  }
}
