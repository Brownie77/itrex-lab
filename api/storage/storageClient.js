const errs = require('../src/errorMsgs');
const { DatabaseUnknownTypeError } = require('../errors/customDatabaseErrs');
const typesEnum = require('./storageTypes');

module.exports = class StorageClient {
  constructor(Database, DBname, type, MapStrategy, ArrayStrategy) {
    this.storage = Database;
    this.name = DBname;
    this.type = type;

    console.log(`${this.name} uses ${Database.DBtype} storage`);

    switch (this.type) {
      case typesEnum.MAP:
        this.strategy = new MapStrategy(this.storage, this.name);
        break;
      case typesEnum.ARRAY:
        this.strategy = new ArrayStrategy(this.storage, this.name);
        break;
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
  }

  async insert(valOrKey, value) {
    return this.strategy.insert(valOrKey, value);
  }

  async exist(value) {
    return this.strategy.exist(value);
  }

  async delete(key) {
    return this.strategy.delete(key);
  }

  async get(key) {
    return this.strategy.get(key);
  }

  // Optional

  async findByIdentifier(identifier) {
    return this.strategy.findByIdentifier(identifier);
  }

  async findById(id) {
    return this.strategy.findById(id);
  }
};
