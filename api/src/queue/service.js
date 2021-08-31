const PatientsService = require('../patients/initService');

module.exports = class QueueService {
  constructor(Storage) {
    this.storage = Storage;
    this.patientsService = PatientsService;
  }

  async enqueue(data) {
    const patient = await this.patientsService.getId(data);

    if (!patient) {
      const { id } = await this.patientsService.create(data);
      return this.storage.save(id);
    }

    return this.storage.save(patient.id);
  }

  async get() {
    const id = await this.storage.getAtPosition(0);
    if (!id) {
      return {};
    }
    const patient = await this.patientsService.findOne({ where: { id } });
    return patient;
  }

  async #delete() {
    return this.storage.deleteAtPosition(0);
  }

  async getNext() {
    await this.#delete();
    return this.get();
  }
};
