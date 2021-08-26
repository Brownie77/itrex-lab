const StrategyInterface = require('../../strategyInterface');

module.exports = class ArrayStrategy extends StrategyInterface {
  constructor(storage, name) {
    super();
    this.storage = storage.client;
    this.name = name;
    this.#create();
  }

  async insert(value) {
    return this.storage[this.name].push(value);
  }

  async exist(value) {
    if (!value.identifier) {
      throw new Error('Value expected to have identifier');
    }
    return this.storage[this.name].some(
      (e) => e.identifier === value.identifier,
    );
  }

  async delete() {
    return this.storage[this.name].shift();
  }

  async get() {
    return this.storage[this.name][0]; // first
  }

  async findByIdentifier(identifier) {
    return {
      ...this.storage[this.name].find(
        (patient) => patient.identifier === identifier,
      ),
    };
  }

  async findById(id) {
    return { ...this.storage[this.name].find((patient) => patient.id === id) };
  }

  #create() {
    this.storage.allocateArray(this.name);
  }
};
