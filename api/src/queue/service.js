const jwt = require('jsonwebtoken');

module.exports = class QueueService {
  constructor(Storage, PatientsService) {
    this.storage = Storage;
    this.patientsService = PatientsService;
  }

  async enqueue(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    const patient = await this.patientsService.findOne({
      where: { userId: decoded.userId },
    });
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

  async getPosition(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    const patient = await this.patientsService.findOne({
      where: { userId: decoded.userId },
    });

    const pos = await this.storage.find(patient.id);
    if (pos !== -1) {
      return pos + 1;
    }
    return null;
  }

  async #delete() {
    return this.storage.deleteAtPosition(0);
  }

  async getNext() {
    await this.#delete();
    return this.get();
  }
};
