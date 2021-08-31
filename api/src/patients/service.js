const { randomUUID } = require('crypto');

module.exports = class PatientsService {
  constructor(Storage) {
    this.storage = Storage;
  }

  async getId(data) {
    const person = await this.findOne({ where: data });

    if (!!person) {
      return { id: person.id };
    }

    return null;
  }

  async create(data) {
    const patient = { ...data };
    patient.id = randomUUID();

    await this.storage.save(patient);
    return { id: patient.id };
  }

  async findOne(query) {
    return this.storage.findOne(query);
  }
};
