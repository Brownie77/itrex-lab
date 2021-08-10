/* eslint-disable max-classes-per-file */
class GlobalDatabaseError extends Error {
  constructor(message) {
    super(message);
    this.type = 'DatabaseError';
    this.name = 'GlobalDatabaseError';
  }
}

class DatabaseAlreadyExistsError extends GlobalDatabaseError {
  constructor(message) {
    super(message);
    this.name = 'DatabaseAlreadyExistsError';
  }
}

class DatabaseWrongTypeError extends GlobalDatabaseError {
  constructor(message) {
    super(message);
    this.name = 'DatabaseWrongTypeError';
  }
}

class DatabaseUnknownTypeError extends GlobalDatabaseError {
  constructor(message) {
    super(message);
    this.name = 'DatabaseUnknownTypeError';
  }
}

class DatabaseDoesntExistError extends GlobalDatabaseError {
  constructor(message) {
    super(message);
    this.name = 'DatabaseDoesntExistError';
  }
}

module.exports.DatabaseAlreadyExistsError = DatabaseAlreadyExistsError;
module.exports.DatabaseWrongTypeError = DatabaseWrongTypeError;
module.exports.DatabaseUnknownTypeError = DatabaseUnknownTypeError;
module.exports.DatabaseDoesntExistError = DatabaseDoesntExistError;
