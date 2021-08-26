const TimeHelper = require('./timeHelper');

describe('test TimeHelper', () => {
  it('should convert minutes to milliseconds correctly', () => {
    const timeHelper = new TimeHelper();
    let inMinutes = 1;
    let inMilliseconds = timeHelper.minToMs(inMinutes);
    expect(inMilliseconds).toEqual(60000);
    inMinutes = 2;
    inMilliseconds = timeHelper.minToMs(inMinutes);
    expect(inMilliseconds).toEqual(120000);
  });
});
