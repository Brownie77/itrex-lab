/* eslint-disable max-classes-per-file */
class GlobalDataError extends Error {
  constructor(message) {
    super(message);
    this.type = 'DataError';
    this.name = 'GlobalDataError';
  }
}

class DataConfilctError extends GlobalDataError {
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

module.exports.DataConfilctError = DataConfilctError;
module.exports.DataNotFoundError = DataNotFoundError;
