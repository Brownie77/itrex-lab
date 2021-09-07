const TimeHelper = require('./timeHelper');

describe('test TimeHelper', () => {
  it('should convert minutes to milliseconds correctly', () => {
    let inMinutes = 1;
    let inMilliseconds = TimeHelper.minToMs(inMinutes);
    expect(inMilliseconds).toEqual(60000);
    inMinutes = 2;
    inMilliseconds = TimeHelper.minToMs(inMinutes);
    expect(inMilliseconds).toEqual(120000);
  });

  it('should return current timestamp', () => {
    const timestamp = TimeHelper.now();
    expect(timestamp).toBeDefined();
  });
});
