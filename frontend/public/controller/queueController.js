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
    try {
      const currentPatient = await this.model.getFirst();
      if (currentPatient) {
        this.view.setCurrentlyDisplayedPatient(currentPatient);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleProcessCurrentPatient() {
    try {
      if (this.view.getCurrentlyDisplayedPatient() !== this.EmptyQueueMsg) {
        const newPatient = (await this.model.getNext()) || this.EmptyQueueMsg;
        this.view.setCurrentlyDisplayedPatient(newPatient);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleAddToQueue() {
    try {
      const newPatient = this.view.getNameFromInputAndClearInput();
      if (newPatient) {
        await this.model.enqueue(newPatient);
        const currentPatient = await this.model.getFirst();
        this.view.setCurrentlyDisplayedPatient(currentPatient);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
