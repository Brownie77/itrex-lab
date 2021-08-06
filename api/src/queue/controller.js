const Service = require('./service');

module.exports = class Controller {
  constructor() {
    this.service = new Service();
  }

  next = (req, res, next) => {
    try {
      const nextPatient = this.service.getNext();

      return res.status(200).send(nextPatient);
    } catch (error) {
      return next(error);
    }
  };

  first = (req, res, next) => {
    try {
      const patient = this.service.getFirst();

      return res.status(200).send(patient);
    } catch (error) {
      return next(error);
    }
  };

  addNewPatient = (req, res, next) => {
    try {
      const data = req.body;

      this.service.enqueue(data);

      return res.status(200).send();
    } catch (error) {
      return next(error);
    }
  };
};
