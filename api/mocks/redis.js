module.exports = new (class RedisMock {
  constructor() {
    this.DBtype = 'redis';
    this.client = this;
    this.map = new Map();
  }

  set(key, value, cb) {
    if (typeof cb === 'function') {
      return cb(null, this.map.set(key, value));
    }
    return this.map.set(key, value);
  }

  exists(key, cb) {
    if (typeof cb === 'function') {
      return cb(null, this.map.has(key));
    }
    return this.map.has(key);
  }

  del(key, cb) {
    if (typeof cb === 'function') {
      return cb(null, this.map.delete(key));
    }
    return this.map.delete(key);
  }

  get(key, cb) {
    if (typeof cb === 'function') {
      return cb(null, this.map.get(key));
    }
    return this.map.get(key);
  }
})();
