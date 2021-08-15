const {
  DatabaseAlreadyExistsError,
} = require('../../errors/customDatabaseErrs');

module.exports = class Database {
  allocateArray(name) {
    if (this[name]) {
      throw new DatabaseAlreadyExistsError(
        `Database name ${name} is already in use.`,
      );
    } else {
      this[name] = [];
    }
  }

  allocateMap(name) {
    if (this[name]) {
      throw new DatabaseAlreadyExistsError(
        `Database name ${name} is already in use.`,
      );
    } else {
      this[name] = new Map();
    }
  }
};
