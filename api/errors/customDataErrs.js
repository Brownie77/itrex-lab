/* eslint-disable max-classes-per-file */
class GlobalDataError extends Error {
  constructor(message) {
    super(message);
    this.type = 'DataError';
    this.name = 'GlobalDataError';
  }
}

class DataConflictError extends GlobalDataError {
  constructor(message) {
    super(message);
    this.name = 'DataConfilctError';
  }
}

class DataNotFoundError extends GlobalDataError {
  constructor(message) {
    super(message);
    this.name = 'DataNotFoundError';
  }
}

class DataForbiddenError extends GlobalDataError {
  constructor(message) {
    super(message);
    this.name = 'DataForbiddenError';
  }
}

module.exports.DataConflictError = DataConflictError;
module.exports.DataNotFoundError = DataNotFoundError;
module.exports.DataForbiddenError = DataForbiddenError;
