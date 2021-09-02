module.exports = class PatientsStorageClient {
  constructor(database) {
    this.db = database.db;
    this.model = database.patient;
  }

  async save(patient) {
    return this.model.create(patient);
  }

  async findOne(query) {
    const data = await this.model.findOne(query);
    return data?.dataValues;
  }

  async findAll(query) {
    const data = await this.model.findAll(query);
    console.log(data);
    return data;
  }
};
