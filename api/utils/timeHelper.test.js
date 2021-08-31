const TimeHelper = require('./timeHelper');

describe('test TimeHelper', () => {
  const timeHelper = new TimeHelper();

  it('should convert minutes to milliseconds correctly', () => {
    let inMinutes = 1;
    let inMilliseconds = timeHelper.minToMs(inMinutes);
    expect(inMilliseconds).toEqual(60000);
    inMinutes = 2;
    inMilliseconds = timeHelper.minToMs(inMinutes);
    expect(inMilliseconds).toEqual(120000);
  });

  it('should return current timestamp', () => {
    const timestamp = timeHelper.now();
    expect(timestamp).toBeDefined();
  });
});
