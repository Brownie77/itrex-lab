const errorMessages = require('../errorMsgs');
const { DataConflictError } = require('../../errors/customDataErrs');

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
    return this.storage.get();
  }

  async enqueue(patient) {
    const exist = await this.storage.exist(patient);
    if (exist) {
      throw new DataConflictError(errorMessages.conflict);
    } else {
      await this.storage.insert(patient);
    }
  }
};
