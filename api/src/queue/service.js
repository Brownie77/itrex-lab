const errorMessages = require('../errorMsgs');
const { DataConfilctError } = require('../../errors/customDataErrs');

module.exports = class Service {
  constructor(StorageClient) {
    this.storage = StorageClient;
  }

  async getNext() {
    await this.#deleteFirst();
    return this.getFirst();
  }

  async #deleteFirst() {
    return this.storage.delete();
  }

  async getFirst() {
    return this.storage.getFromArray()
  }

  async enqueue(patient) {
    const exist = await this.storage.exist(patient);
    if (exist) {
      throw new DataConfilctError(errorMessages.conflict);
    } else {
      await this.storage.insert(patient);
    }
