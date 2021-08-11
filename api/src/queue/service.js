const StorageClient = require('../../storage/storageClient');
const errorMessages = require('../errorMsgs');

module.exports = class {
  constructor() {
    this.sc = new StorageClient();
    this.dbName = 'Queue';
    this.type = 'array';
    this.sc.create(this.type, this.dbName);
  }

  getNext() {
    this.#deleteFirst();
    return this.getFirst();
  }

  #deleteFirst() {
    this.sc.delete(this.dbName);
  }

  getFirst() {
    return this.sc.get(this.dbName);
  }

  enqueue(patient) {
    if (this.sc.exist(this.type, this.dbName, patient)) {
      throw new Error(errorMessages.conflict);
    }
    this.sc.insert(this.dbName, patient);
  }
};
