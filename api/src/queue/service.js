const errorMessages = require('../errorMsgs');
const { DataConfilctError } = require('../../errors/customDataErrs');

module.exports = class Service {
  constructor(StorageClient) {
    this.storage = StorageClient;
  }

  getNext() {
    this.#deleteFirst();
    return this.getFirst();
  }

  async #deleteFirst() {
    await this.storage.delete();
  }

  async getFirst() {
    return this.storage.get();
  }

  async enqueue(patient) {
    const exist = await this.storage.exist(patient);
    if (exist) {
      throw new DataConfilctError(errorMessages.conflict);
    } else {
      await this.storage.insert(patient);
    }
  }
};
