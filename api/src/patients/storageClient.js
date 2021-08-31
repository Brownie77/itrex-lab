const { Strategy } = require('./currentMode');

module.exports = class PatientsStorageClient {
  constructor(database) {
    this.storageName = 'Patients';
    this.strategy = new Strategy(database, this.storageName);
    console.log(`Patients Service uses ${database.type} storage`);
  }

  async save(patient) {
    return this.strategy.save(patient);
  }

  /**
   *
   * query example : { where: { id: 1, name: 'John'} } || { where: { name: 'John'} }
   *
   */

  async findOne(query) {
    return this.strategy.findOne(query);
  }
};
