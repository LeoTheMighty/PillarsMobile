/**
 * A record for the submission of completion of a task to further a goal (Pillar).
 */
type PillarSubmission = {
  /** The ISO string indicating when the Pillar submission was submitted. */
  time_submitted: string,
  /** The value from 0 - 1 indicating the level to which this submission indicates. */
  value: number,
};

export default PillarSubmission;
