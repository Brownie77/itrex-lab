module.exports = class TimeHelper {
  minToMs(min) {
    return min * 60 * 1000;
  }

  now() {
    return Date.now();
  }
};
