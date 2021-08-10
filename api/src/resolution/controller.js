const ResolutionService = require('./service');
const { ok } = require('../statuses');

module.exports = class ResolutionController {
  constructor() {
    this.service = new ResolutionService();
  }

  get = (req, res, next) => {
    try {
      const data = req.params;

      const found = this.service.getByKey(data);

      delete found.ttl;

      return res.status(ok).send(found);
    } catch (error) {
      return next(error);
    }
  };

  set = (req, res, next) => {
    try {
      const data = {
        id: req.params.id,
        resolution: req.body.resolution,
        ttl: req.body.ttl,
      };

      this.service.set(data);

      return res.status(ok).send();
    } catch (error) {
      return next(error);
    }
  };

  delete = (req, res, next) => {
    try {
      const data = {
        id: req.params.id,
      };

      this.service.delete(data);

      return res.status(ok).send();
    } catch (error) {
      return next(error);
    }
  };
};
