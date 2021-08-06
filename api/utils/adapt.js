module.exports = (req) => ({ ...req.body, ...req.params });
