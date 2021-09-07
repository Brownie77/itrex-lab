const { DataNotFoundError } = require('../../errors/customDataErrs');
const errMsg = require('../errorMessages');

module.exports = class PatientsService {
  constructor(Storage) {
    this.storage = Storage;
  }

  async getId(data) {
    const person = await this.findOne({ where: data });

    if (!person) {
      throw new DataNotFoundError(errMsg.notfound);
    }

    return { id: person.id };
  }

  async createPatient(data) {
    const patient = { ...data };
    delete patient.password;
    delete patient.email;

    return this.storage.save(patient);
  }

  async findOne(query) {
    return this.storage.findOne(query);
  }
};
