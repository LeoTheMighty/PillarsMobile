import faker from 'faker';
import _ from 'lodash';
import { getCurrentPillarValue, _randomPillars } from '../PillarHelper';
import { convertToISOString, daysBefore, now } from '../TimeHelper';
import type Pillar from '../../types/Pillar';

const nowDateTime = now();

const createTestDiscretePillar = () => {
  // eslint-disable-next-line no-undef
  const args = arguments;
  return {
    color: faker.commerce.color(),
    name: faker.hacker.name(),
    submissions: _.times(args.length, (i) => ({
      time_submitted: daysBefore(args[i], nowDateTime),
      value: 1,
    })),
  };
};

const createWeekDPillar = () => ({
  ...createTestDiscretePillar(arguments),
  time_created: daysBefore(7, nowDateTime),
});

const weekLongPillar1 = {};

const booleanPillar: Pillar = {
  color: 'red',
  name: '',
  type: null,
  submissions: [
    {
      value: 1,
      time_submitted: convertToISOString(daysBefore(0)),
    },
  ],
};

describe('Pillar Helper', () => {
  describe('Get Pillar Value', () => {
    describe('Discrete Submission Values', () => {
      describe('Daily Value', () => {});
      describe('Weekly Value', () => {
        // TODO:
        test('should get 7 / 7 pillar score', () => {
          const nowDate = now();
          const pillar = { color: 'red', name: 'Name', submissions: [] };
          for (let i = 0; i < 7; i += 1) {
            pillar.submissions.push({
              value: 1,
              time_submitted: convertToISOString(daysBefore(i, nowDate)),
            });
          }
          expect(getCurrentPillarValue(pillar, 'week', 1, nowDate)).toEqual(1);
        });
        test('should get 0 / 7 pillar score', () => {
          const pillar = { color: 'red', name: 'Name', submissions: [] };
          expect(getCurrentPillarValue(pillar, 'week', 1)).toEqual(0);
        });
        // 1 / 7 first
        test('should get first 1 / 7 pillar score', () => {
          expect(getCurrentPillarValue(createTestDiscretePillar(0))).toBe(0);
        });
        // 1 / 7 last
        test('should get last 1 / 7 pillar score', () => {});
        // 2 / 7 both f + l
        test('should get first and last 2 / 7 pillar score', () => {});
        // 0 / 7 before first
        test('should get 0 / 7 before first day pillar score', () => {});
        // 4 / 7 spaced
        test('should get spaced 4 / 7 pillar score', () => {});
        test('get measured worst pillar score', () => {
          const nowDate = now();
          const pillar = { color: 'red', name: 'Name', submissions: [] };
          for (let i = 0; i < 7; i += 1) {
            pillar.submissions.push({
              value: 0,
              time_submitted: convertToISOString(daysBefore(i, nowDate)),
            });
          }
          expect(getCurrentPillarValue(pillar, 'week', 1, nowDate)).toEqual(0);
        });
      });
      describe('Monthly Value', () => {});
      describe('Yearly Value', () => {});
      describe('Value from Start', () => {});
    });
    describe('Continuous Submission Values', () => {
      describe('Daily Value', () => {});
      describe('Weekly Value', () => {});
      describe('Monthly Value', () => {});
      describe('Yearly Value', () => {});
      describe('Value from Start', () => {});
    });
  });
  test('should calculate current pillar value correctly', () => {
    expect(getCurrentPillarValue(booleanPillar)).toBeTruthy();
  });
  describe('Random Pillars', () => {
    test('should make 1 random pillar correctly', () => {
      const pillars = _randomPillars(1);
      expect(pillars).toHaveLength(1);
    });
  });
});
