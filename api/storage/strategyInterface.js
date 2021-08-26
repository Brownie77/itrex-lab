const { InterfaceViolationError } = require('../errors/customInterfaceErrs');

module.exports = class StrategyInterface {
  constructor() {
    if (!this.insert) {
      throw new InterfaceViolationError('Strategy must have insert method');
    }
    if (!this.exist) {
      throw new InterfaceViolationError('Strategy must have exist method');
    }
    if (!this.delete) {
      throw new InterfaceViolationError('Strategy must have delete method');
    }
    if (!this.get) {
      throw new InterfaceViolationError('Strategy must have get method');
    }
  }
};
