module.exports = class TimeHelper {
  static minToMs(min) {
    return min * 60 * 1000;
  }

  static hoursToMs(hours) {
    return hours * 3600000;
  }

  static now() {
    return Date.now();
  }
};
