export default class QueueController {
  constructor(queueView, queueModel) {
    this.view = queueView;
    this.model = queueModel;

    $(document).ready(this.handleLoad.bind(this));
    $('#add-to-queue-btn').click(this.handleAddToQueue.bind(this));
    $('#next-patient').click(this.handleProcessCurrentPatient.bind(this));
  }

  handleLoad() {
    const currentPatient = this.model.getFirst();
    if (currentPatient) {
      this.view.setCurrentlyDisplayedPatient(currentPatient);
    }
  }

  handleProcessCurrentPatient() {
    this.model.dequeue();
    const newPatient = this.model.getFirst();
    this.view.setCurrentlyDisplayedPatient(newPatient);
  }

  handleAddToQueue() {
    const newPatient = this.view.getNameFromInputAndClearInput();
    this.model.enqueue(newPatient);
    const currentPatient = this.model.getFirst();
    this.view.setCurrentlyDisplayedPatient(currentPatient);
  }
}
