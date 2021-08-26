const StrategyInterface = require('../../strategyInterface');

module.exports = class ArrayStrategy extends StrategyInterface {
  constructor(storage, name) {
    super();
    this.storage = storage.client;
    this.name = name;
    this.model = storage.patient;
  }

  async insert({ id, identifier, name }) {
    return this.model.create({ id, name, identifier });
  }

  async exist(value) {} // not needed as we won't store the queue in mysql

  async delete() {} // not needed as we won't store the queue in mysql

  async get() {} // not needed as we won't store the queue in mysql

  async findByIdentifier(identifier) {
    const data = await this.model.findOne({ where: { identifier } });
    return data.dataValues;
  }

  async findById(id) {
    return this.model.findByPk(id);
  }
};
