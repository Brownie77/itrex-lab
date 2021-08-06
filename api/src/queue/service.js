const StorageClient = require('../../storage/storageClient');
const errorMessages = require('../errorMsgs');
const { DataConfilctError } = require('../../errors/customDataErrs');

module.exports = class Service {
  constructor() {
    this.storage = new StorageClient();
    this.dbName = 'Queue';
    this.type = 'array';
    this.storage.create(this.type, this.dbName);
  }

  getNext() {
    this.#deleteFirst();
    return this.getFirst();
  }

  #deleteFirst() {
    this.storage.delete(this.dbName);
  }

  getFirst() {
    return this.storage.get(this.dbName);
  }

  enqueue(patient) {
    if (this.storage.exist(this.type, this.dbName, patient)) {
      throw new DataConfilctError(errorMessages.conflict);
    }
    this.storage.insert(this.dbName, patient);
  }
};
