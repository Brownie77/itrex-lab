/* eslint-disable max-classes-per-file */
class GlobalInterfaceError extends Error {
  constructor(message) {
    super(message);
    this.type = 'InterfaceError';
    this.name = 'GlobalInterfaceError';
  }
}

class InterfaceViolationError extends GlobalInterfaceError {
  constructor(message) {
    super(message);
    this.name = 'InterfaceViolationError';
  }
}

module.exports.InterfaceViolationError = InterfaceViolationError;
