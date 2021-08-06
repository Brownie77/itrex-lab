const Database = require('./database');
const errs = require('../src/errorMsgs');
const {
  DatabaseWrongTypeError,
  DatabaseUnknownTypeError,
  DatabaseDoesntExistError,
} = require('../errors/customDatabaseErrs');

module.exports = class StorageClient {
  constructor() {
    this.storage = Database;
  }

  insert(db, valOrKey, value = undefined) {
    if (this.#exists(db)) {
      if (value !== undefined) {
        this.storage[db].set(valOrKey, value);
      } else {
        this.storage[db].push(valOrKey);
      }
    }
  }

  exist(type, db, value) {
    this.#exists(db);
    switch (type) {
      case 'map':
        return this.storage[db].has(value);
      case 'array':
        if (typeof value !== 'object' || value.name === undefined) {
          throw new DatabaseWrongTypeError(
            "Object with property 'name' expected.",
          );
        }
        return this.storage[db].some((e) => e.name === value.name);
      default:
        throw new DatabaseUnknownTypeError(errs.wrongDBType);
    }
  }

  delete(db, key = undefined) {
    if (this.#exists(db)) {
      if (key !== undefined) {
        this.storage[db].set(key, null);
      } else {
        this.storage[db].shift();
      }
    }
  }

  get(db, key = undefined) {
    this.#exists(db);
    if (key !== undefined) {
      return { ...this.storage[db].get(key) };
    }
    return this.storage[db][0];
  }

  create(type, db) {
    switch (type) {
      case 'array':
        this.storage.allocateArray(db);
        break;
      case 'map':
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
