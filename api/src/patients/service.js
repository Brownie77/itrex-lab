module.exports = class PatientsService {
  constructor(Storage) {
    this.storage = Storage;
  }

  async getId(data) {
    const person = await this.findOne(data);

    if (person) {
      return { id: person.id };
    }

    return null;
  }

  async createPatient(data) {
    const patient = { ...data };
    delete patient.password;
    delete patient.email;

    return this.storage.save(patient);
  }

  async findAll(query) {
    return this.storage.findAll(query);
  }

  async findOne(query) {
    return this.storage.findOne(query);
  }
};
