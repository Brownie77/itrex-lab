const Service = require('./service');

const schemas = require('./validationSchemas');
const validate = require('../../utils/validate');
const errorMessages = require('../errorMsgs');
const errorStatus = require('../../utils/errStatus')(errorMessages);

module.exports = class {
  constructor() {
    this.service = new Service();
    this.validate = validate;
  }

  next = (req, res) => {
    try {
      const next = this.service.getNext();

      return res.status(200).send(next);
    } catch (error) {
      const status = errorStatus(error);
      return res.status(status).send();
    }
  };

  first = (req, res) => {
    try {
      const patient = this.service.getFirst();

      return res.status(200).send(patient);
    } catch (error) {
      const status = errorStatus(error);
      return res.status(status).send();
    }
  };

  addNewPatient = (req, res) => {
    try {
      const data = req.body;
      this.validate(schemas.patientSchema, data);

      this.service.enqueue(data);

      return res.status(200).send();
    } catch (error) {
      const status = errorStatus(error);
      return res.status(status).send();
    }
  };
};
