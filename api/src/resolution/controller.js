const adapt = require('../../utils/adapt');

module.exports = class Controller {
  constructor(Service) {
    this.service = Service;
    this.adapt = adapt;
  }

  get = async (req, res, next) => {
    try {
      const data = req.params;

      const found = await this.service.getByKey(data);

      delete found.ttl;
      return res.status(200).send(found);
    } catch (error) {
      return next(error);
    }
  };

  set = async (req, res, next) => {
    try {
      const data = this.adapt(req);

      await this.service.set(data);

      return res.status(200).send();
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = this.adapt(req);

      await this.service.delete(data);

      return res.status(200).send();
    } catch (error) {
      return next(error);
    }
  };
};
