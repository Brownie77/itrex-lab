const Service = require('./service');

const adapt = require('../../utils/adapt');

module.exports = class Controller {
  constructor() {
    this.service = new Service();
    this.adapt = adapt;
  }

  get = (req, res, next) => {
    try {
      const data = req.params;

      const found = this.service.getByKey(data);

      delete found.ttl;

      return res.status(200).send(found);
    } catch (error) {
      return next(error);
    }
  };

  set = (req, res, next) => {
    try {
      const data = this.adapt(req);

      this.service.set(data);

      return res.status(200).send();
    } catch (error) {
      return next(error);
    }
  };

  delete = (req, res, next) => {
    try {
      const data = this.adapt(req);

      this.service.delete(data);

      return res.status(200).send();
    } catch (error) {
      return next(error);
    }
  };
};
