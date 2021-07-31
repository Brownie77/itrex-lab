export default class QueueController {
  constructor(queueView, queueModel) {
    this.view = queueView;
    this.model = queueModel;

    $(document).ready(this.handleLoad.bind(this));
    $('#add-to-queue-btn').click(this.handleAddToQueue.bind(this));
    $('#next-patient').click(this.handleProcessCurrentPatient.bind(this));
  }

  handleLoad() {
    const currentPatient = this.model.getFirstFromQueue();
    if (currentPatient) {
      this.view.setCurrentlyDisplayedPatient(currentPatient);
    }
  }

  handleProcessCurrentPatient() {
    const currentPatient = this.view.getCurrentlyDisplayedPatient();
    this.model.deleteFirstFromQueue(currentPatient);
    const newPatient = this.model.getFirstFromQueue();
    this.view.setCurrentlyDisplayedPatient(newPatient);
  }

  handleAddToQueue() {
    const newPatient = this.view.getNameFromInput();
    this.model.addToQueue(newPatient);
    const currentPatient = this.model.getFirstFromQueue();
    this.view.setCurrentlyDisplayedPatient(currentPatient);
  }
}
