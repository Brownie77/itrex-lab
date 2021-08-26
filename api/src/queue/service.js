const Patient = require('../../models/patient');

module.exports = class QueueService {
  constructor(QueueStorageClient, PatientsStorageClient) {
    this.queueStorage = QueueStorageClient;
    this.patients = PatientsStorageClient;
  }

  async getNext() {
    await this.#deleteFirst();
    return this.getFirst();
  }

  async #deleteFirst() {
    return this.queueStorage.delete();
  }

  async getFirst() {
    const patientID = await this.queueStorage.get();
    return this.patients.findById(patientID);
  }

  async enqueue(data) {
    const patient = new Patient(data.name);
    this.patients.insert(patient);
    return this.queueStorage.insert(patient.id);
  }
};
