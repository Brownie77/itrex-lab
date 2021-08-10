const Database = require('./database');
const errs = require('../src/errorMsgs');
const {
  DatabaseWrongTypeError,
  DatabaseUnknownTypeError,
  DatabaseDoesntExistError,
} = require('../errors/customDatabaseErrs');
const TypesEnum = require('./storageTypes');

module.exports = class StorageClient {
  constructor() {
    this.storage = Database;
  }

  insertToMap(db, key, value) {
    this.#exists(db);
    this.storage[db].set(key, value);
  }

  insertToArray(db, value) {
    this.#exists(db);
    this.storage[db].push(value);
  }

  existInMap(db, value) {
    this.#exists(db);
    return this.storage[db].has(value);
  }

  existInArray(db, value) {
    this.#exists(db);
    if (typeof value !== 'object' || value.name === undefined) {
      throw new DatabaseWrongTypeError("Object with property 'name' expected.");
    }
    return this.storage[db].some((e) => e.name === value.name);
  }

  deleteFromMap(db, key) {
    this.#exists(db);
    this.storage[db].set(key, null);
  }

  deleteFromArray(db) {
    this.#exists(db);
    this.storage[db].shift();
  }

  getFromMap(db, key) {
    this.#exists(db);
    return { ...this.storage[db].get(key) };
  }

  getFromArray(db) {
    this.#exists(db);
    return this.storage[db][0];
  }

  create(type, db) {
    switch (type) {
      case TypesEnum.ARRAY:
        this.storage.allocateArray(db);
        break;
      case TypesEnum.MAP:
        this.storage.allocateMap(db);
        break;
      default:
        throw new DatabaseUnknownTypeError(errs.wrongDBType);
    }
  }

  #exists(db) {
    if (!this.storage[db]) {
      throw new DatabaseDoesntExistError(`Database ${db} doesn't exist.`);
    } else return true;
  }
};
