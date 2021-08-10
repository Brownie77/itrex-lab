const StorageClient = require('../../storage/storageClient');
const errorMessages = require('../errorMsgs');
const { DataConfilctError } = require('../../errors/customDataErrs');
const TypesEnum = require('../../storage/storageTypes');

module.exports = class QueueService {
  constructor() {
    this.storage = new StorageClient();
    this.dbName = 'Queue';
    this.type = TypesEnum.ARRAY;
    this.storage.create(this.type, this.dbName);
  }

  getNext() {
    this.#deleteFirst();
    return this.getFirst();
  }

  #deleteFirst() {
    this.storage.deleteFromArray(this.dbName);
  }

  getFirst() {
    return this.storage.getFromArray(this.dbName);
  }

  enqueue(patient) {
    if (this.storage.existInArray(this.dbName, patient)) {
      throw new DataConfilctError(errorMessages.conflict);
    }
    this.storage.insertToArray(this.dbName, patient);
  }
};
