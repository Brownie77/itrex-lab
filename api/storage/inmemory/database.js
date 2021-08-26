module.exports = new (class Database {
  constructor() {
    this.DBtype = 'inmemory';
    this.client = this;
  }

  allocateArray(name) {
    if (!this[name]) {
      this[name] = [];
    }
  }

  allocateMap(name) {
    if (!this[name]) {
      this[name] = new Map();
    }
  }
})();
