module.exports = new (class Database {
  constructor() {
    this.db = this;
    this.type = 'test';
    this.map = new Map();
  }

  allocateArray(name) {
    if (!this[name]) {
      this[name] = [];
    }
  }

  set(key, value, cb) {
    if (typeof cb === 'function') {
      return cb(null, this.map.set(key, value));
    }
    return this.map.set(key, value);
  }

  get(key, cb) {
    if (typeof cb === 'function') {
      return cb(null, this.map.get(key));
    }
    return this.map.get(key);
  }
})();
