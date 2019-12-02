import { daysBefore, now } from '../TimeHelper';

describe('Time Helper', () => {
  test('days before', () => {
    expect(daysBefore(1, new Date(2019, 0, 15))).toEqual(new Date(2019, 0, 14));
  });
});
