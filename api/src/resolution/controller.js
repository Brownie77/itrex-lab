const status = require('../statuses');

module.exports = class ResolutionController {
  constructor(Service) {
    this.service = Service;
  }

  get = async (req, res, next) => {
    try {
      const data = req.params;

      const found = await this.service.getByKey(data);

      delete found.ttl;
      return res.status(status.OK).send(found);
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

      return res.status(status.CREATED).send();
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = {
        id: req.params.id,
      };

      await this.service.delete(data);

      return res.status(status.OK).send();
    } catch (error) {
      return next(error);
    }
  };
};
