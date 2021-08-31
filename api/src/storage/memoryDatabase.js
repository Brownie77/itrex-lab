module.exports = new (class Database {
  constructor() {
    this.type = 'in-memory';
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
