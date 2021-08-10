module.exports = new (class {
  allocateArray(name) {
    if (this[name]) {
      throw new Error(`Database name ${name} is already in use.`);
    } else {
      this[name] = [];
    }
  }

  allocateMap(name) {
    if (this[name]) {
      throw new Error(`Database name ${name} is already in use.`);
    } else {
      this[name] = new Map();
    }
  }
})();
