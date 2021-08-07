export default class QueueController {
  constructor(queueView, queueModel) {
    this.view = queueView;
    this.model = queueModel;

    $(document).ready(this.handleLoad.bind(this));
    $('#add-to-queue-btn').click(this.handleAddToQueue.bind(this));
    $('#next-patient').click(this.handleProcessCurrentPatient.bind(this));
    $('#use-default-TTL-check').change(this.handleCheck.bind(this));
  }

  handleLoad() {
    const currentPatient = this.model.getFirst();
    if (currentPatient) {
      this.view.setCurrentlyDisplayedPatient(currentPatient);
    }
  }

  handleCheck() {
    this.view.hideOrShowTTLInput();
  }

  handleProcessCurrentPatient() {
    this.model.dequeue();
    const newPatient = this.model.getFirst();
    this.view.setCurrentlyDisplayedPatient(newPatient);
  }

  handleAddToQueue() {
    const newPatient = this.view.getNameFromInputAndClearInput();
    let ttl = null;
    const toMinutes = 1000 * 60;
    if (!this.view.shouldKeepForever()) {
      ttl = this.view.getTTLAndClearInput();
      if (Number.isNaN(ttl)) {
        throw new Error('TTL expected to be a number.');
      }
      ttl *= toMinutes;
    }

    if (ttl) {
      setTimeout(() => {
        this.model.deleteByName(newPatient);
        const currentPatient = this.model.getFirst();
        this.view.setCurrentlyDisplayedPatient(currentPatient);
      }, ttl);
    }

    this.model.enqueue(newPatient);
    const currentPatient = this.model.getFirst();
    this.view.setCurrentlyDisplayedPatient(currentPatient);
  }
}
