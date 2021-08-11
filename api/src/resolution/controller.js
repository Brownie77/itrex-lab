const Service = require('./service');

const schemas = require('./validationSchemas');
const validate = require('../../utils/validate');
const errorMessages = require('../errorMsgs');
const errorStatus = require('../../utils/errStatus')(errorMessages);
const adapt = require('../../utils/adapt');

module.exports = class {
  constructor() {
    this.service = new Service();
    this.validate = validate;
    this.adapt = adapt;
  }

  get = (req, res) => {
    try {
      const data = this.adapt(req);
      this.validate(schemas.getResolutionSchema, data);

      const found = this.service.getByKey(data);

      delete found.ttl;

      return res.status(200).send(found);
    } catch (error) {
      const status = errorStatus(error);
      return res.status(status).send();
    }
  };

  set = (req, res) => {
    try {
      const data = this.adapt(req);
      this.validate(schemas.setResolutionSchema, data);

      this.service.set(data);

      return res.status(200).send();
    } catch (error) {
      const status = errorStatus(error);
      return res.status(status).send();
    }
  };

  delete = (req, res) => {
    try {
      const data = this.adapt(req);
      this.validate(schemas.getResolutionSchema, data);

      this.service.delete(data);

      return res.status(200).send();
    } catch (error) {
      const status = errorStatus(error);
      return res.status(status).send();
    }
  };
};
