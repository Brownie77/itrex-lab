module.exports = new (class RedisMock {
  constructor() {
    this.type = 'redis';
    this.db = this;
    this.map = new Map();
  }

  #parse(pattern) {
    //parsing patterns like *"key":"val"*"key":"val""* into query object
    const parsedObj = {};
    let key = '';
    let val = '';

    let cut = false;
    let isKey = true;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === '"' && !cut) {
        cut = true;
      } else if (pattern[i] === '"' && cut) {
        if (!isKey) {
          parsedObj[key] = val;
          key = '';
          val = '';
        }
        isKey = !isKey;
        cut = false;
      } else if (cut && isKey) {
        key += pattern[i];
      } else if (cut && !isKey) {
        val += pattern[i];
      }
    }

    return { where: parsedObj };
  }

  scanAll(pattern) {
    const query = this.#parse(pattern);
    const keys = Object.keys(query.where);
    const entries = [...this.map.keys()];
    let patient = null;

    const id = entries
      .filter((data) => {
        try {
          JSON.parse(data); // if stringified json
        } catch (e) {
          return false;
        }
        return true;
      })
      .find((raw) => {
        patient = JSON.parse(raw);
        let match = true;

        keys.map((key) => {
          if (patient[key] !== query.where[key]) {
            match = false;
          }
        });

        if (match) {
          return { ...patient };
        }
      });

    return [id];
  }

  set(key, value, cb) {
    if (typeof cb === 'function') {
      return cb(null, this.map.set(key, value));
    }
    return this.map.set(key, value);
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
