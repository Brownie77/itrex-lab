module.exports = class TimeHelper {
  constructor(defaultTtl) {
    this.toMs = 60 * 1000; // 1 minute in milliseconds
    this.defaultTtl = defaultTtl;
  }

  setTTL(ttl) {
    if (ttl === 0) {
      return Date.now() + this.defaultTtl * this.toMs;
    }
    return Date.now() + ttl * this.toMs;
  }

  // eslint-disable-next-line class-methods-use-this
  isOutdated(ttl) {
    return ttl ? ttl < Date.now() : false;
  }
};
