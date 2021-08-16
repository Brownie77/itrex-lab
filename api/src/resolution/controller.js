const { ok } = require('../statuses');

module.exports = class Controller {
  constructor(Service) {
    this.service = Service;
  }

  get = async (req, res, next) => {
    try {
      const data = req.params;

      const found = await this.service.getByKey(data);

      delete found.ttl;
      return res.status(ok).send(found);
    } catch (error) {
      return next(error);
    }
  };

  set = async (req, res, next) => {
    try {
        const data = {
          id: req.params.id,
          resolution: req.body.resolution,
          ttl: req.body.ttl,
        };

      await this.service.set(data);

      return res.status(ok).send();


  delete = async (req, res, next) => {
    try {
      const data = {
        id: req.params.id,
      };

      await this.service.delete(data);

      return res.status(ok).send();
    } catch (error) {
      return next(error);
    }
  };
};
