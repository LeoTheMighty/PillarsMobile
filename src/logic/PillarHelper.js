import faker from 'faker';
import _ from 'lodash';
import {
  now,
  daysBefore,
  weeksBefore,
  monthsBefore,
  yearsBefore,
  parseISOString,
  daysBetween,
  convertToISOString,
  isSameDay,
} from './TimeHelper';

/**
 * Creates a new Pillar.
 *
 * @param {string} name The name of the pillar.
 * @param {string} description The description for the pillar.
 * @param {string} color The color to display for the pillar.
 * @param {string|null} type The special type of the pillar to create.
 * @returns {Pillar} The newly created Pillar.
 */
export const newPillar = (name, description, color, type) => ({
  name,
  description,
  color,
  type,
  timeCreated: convertToISOString(now()),
  submissions: [],
});

/**
 * Creates a new custom Pillar.
 *
 * @param {string} name The name of the pillar.
 * @param {string} description The description for the pillar.
 * @param {string} color The color to display for the pillar.
 * @returns {Pillar} The newly created custom Pillar.
 */
export const newCustomPillar = (name, description, color) =>
  newPillar(name, description, color, null);

/**
 * Deep copies a pillar entirely.
 *
 * @param {Pillar} pillar The pillar to copy.
 * @return {Pillar} The copied pillar.
 */
export const deepCopyPillar = (pillar) => ({
  ...pillar,
  submissions: _.times(pillar.submissions.length, (i) =>
    deepCopyPillarSubmission(pillar.submissions[i]),
  ),
});

/**
 * Deep copies a submission entirely.
 *
 * @param {PillarSubmission} pillarSubmission The submission to copy.
 * @return {PillarSubmission} The newly copied submission.
 */
export const deepCopyPillarSubmission = (pillarSubmission) => ({
  ...pillarSubmission,
});

/**
 * Creates a new Submission for a Pillar.
 *
 * @param {number} value The decimal value to accompany the submission.
 * @returns {PillarSubmission} The newly created submission.
 */
export const newSubmission = (value) => ({
  value,
  time_submitted: convertToISOString(now()),
});

/**
 * Returns whether the pillar has been submitted today yet.
 *
 * @param {Pillar} pillar The pillar object to receive the information about
 * @param {Date} nowDate The date describing right now
 * @returns {boolean} Whether the pillar has been submitted already now
 */
export const isSubmitted = (pillar, nowDate = now()) => {
  if (pillar.submissions && pillar.submissions.length > 0) {
    return isSameDay(
      parseISOString(pillar.submissions[0].time_submitted),
      nowDate,
    );
  }
  return false;
};

/**
 * Gets the start date for the interval that the pillar is calculating for.
 *
 * @param {string} interval The name of the length of the specific interval to calculate for
 * @param {number} duration The number of intervals before the start of the date
 * @param {Date} nowDate The date object indicating when to get the interval start for
 * @returns{Date} The date for the start of the interval for the pillar value
 */
const getIntervalStart = (interval, duration, nowDate) => {
  switch (interval) {
    case 'day':
      return daysBefore(duration, nowDate);
    case 'week':
      return weeksBefore(duration, nowDate);
    case 'month':
      return monthsBefore(duration, nowDate);
    case 'year':
      return yearsBefore(duration, nowDate);
    default:
      throw new Error(`Unrecognized interval string = ${interval}`);
  }
};

/**
 * Gets the current pillar value for the pillar as it will show up on the screen
 *
 * @param {Pillar} pillar The pillar to calculate the current value for.
 * @param {string} interval The name of the interval to calculate the value for
 * @param {number} duration The number of intervals to calculate the value for
 * @param  {Date} nowDate The date that determines the now date in the value
 * @return {number} Returns a percentage for the current value of the pillar
 */
export const getCurrentPillarValue = (
  pillar,
  interval = 'week',
  duration = 1,
  nowDate = now(),
) => {
  const intervalStart =
    interval === 'start'
      ? daysBefore(1, parseISOString(pillar.timeCreated))
      : getIntervalStart(interval, duration, nowDate);
  let summedValues = 0;
  if (!pillar.submissions || pillar.submissions.length === 0) {
    return 0.0;
  }
  for (let i = 0; i < pillar.submissions.length; i += 1) {
    const submission = pillar.submissions[i];
    if (parseISOString(submission.time_submitted) > intervalStart) {
      // Add to the value
      summedValues += submission.value;
    } else {
      break;
    }
  }
  if (pillar.timeCreated) {
    const totalTime = Math.min(
      daysBetween(intervalStart, nowDate),
      daysBetween(parseISOString(pillar.timeCreated), nowDate) + 1,
    );
    return summedValues / totalTime;
  }
  return summedValues / daysBetween(intervalStart, nowDate);
};

/**
 * TEST FUNCTION, creates a random pillars array.
 *
 * @param {number} numPillars The number of pillars in the array
 * @param {number} maxNumSubmissions The max number of submissions for each pillar
 * @return {[Pillar]} The random pillars
 * @private
 */
export const _randomPillars = (numPillars = 3, maxNumSubmissions = 10) => {
  const pillars = [];
  const potentialPillarNames = [
    'Exercise',
    'Diet',
    'Love',
    'Pillars',
    'Work',
    'Happiness',
  ];
  for (let i = 0; i < numPillars; i += 1) {
    const name =
      potentialPillarNames[
        Math.floor(Math.random() * potentialPillarNames.length)
      ];
    const color = faker.commerce.color();
    const pillar = {
      name,
      color,
      submissions: [],
    };
    const maxSubmissionInterval = 3;
    let numberOfDaysBefore = Math.floor(Math.random() * maxSubmissionInterval);
    for (
      let _ = 0;
      _ < faker.random.number(maxNumSubmissions - 1) + 1;
      _ += 1
    ) {
      // earliest to latest
      pillar.submissions.push({
        value: Math.random(),
        time_submitted: convertToISOString(daysBefore(numberOfDaysBefore)),
      });
      numberOfDaysBefore += Math.floor(Math.random() * maxSubmissionInterval);
    }
    pillars.push(pillar);
  }
  return pillars;
};
