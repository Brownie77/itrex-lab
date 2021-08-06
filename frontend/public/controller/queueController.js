export default class QueueController {
  constructor(queueView, queueModel) {
    this.view = queueView;
    this.model = queueModel;

    $(document).ready(this.handleLoad.bind(this));
    $('#add-to-queue-btn').click(this.handleAddToQueue.bind(this));
    $('#next-patient').click(this.handleProcessCurrentPatient.bind(this));
  }

  async handleLoad() {
    const currentPatient = await this.model.getFirst();
    if (currentPatient) {
      this.view.setCurrentlyDisplayedPatient(currentPatient);
    }
  }

  async handleProcessCurrentPatient() {
    await this.model.dequeue();
    const newPatient = await this.model.getFirst();
    this.view.setCurrentlyDisplayedPatient(newPatient);
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
