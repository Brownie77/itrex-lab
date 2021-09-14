const { Strategy } = require('./currentStrategy');

module.exports = class QueueStorageClient {
  constructor(database) {
    this.storageName = 'Queue';
    this.strategy = new Strategy(database, this.storageName);
    console.log(`Queue Service uses ${database.type} storage`);
  }

  async save(patient) {
    return this.strategy.save(patient);
  }

  async setQueue(doctorId) {
    return this.strategy.setQueue(doctorId);
  }

  async find(patient) {
    return this.strategy.find(patient);
  }

  async getAtPosition(at) {
    return this.strategy.getAtPosition(at);
  }

  async deleteAtPosition(at) {
    return this.strategy.deleteAtPosition(at);
  }
};
