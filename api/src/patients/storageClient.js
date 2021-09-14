const { DataConflictError } = require('../../errors/customDataErrs');

module.exports = class PatientsStorageClient {
  constructor(database) {
    this.db = database.db;
    this.model = database.patient;
  }

  async save(patient) {
    console.log('patient is', patient);
    const exist = await this.findOne({ where: { name: patient.name } });
    if (exist) {
      throw new DataConflictError('Patient with this name already exists');
    }
    return this.model.create(patient);
  }

  async findOne(query) {
    const data = await this.model.findOne(query);
    return data?.dataValues;
  }
};
