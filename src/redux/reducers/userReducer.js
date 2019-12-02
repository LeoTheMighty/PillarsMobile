import type PillarsUser from '../../types/PillarsUser';
import { ERR } from '../../logic/Constants';
import {
  LOAD_USER,
  SAVE_USER,
  ADD_PILLAR,
  EDIT_PILLAR,
  REMOVE_PILLAR,
  ADD_SUBMISSION,
  REMOVE_SUBMISSION,
} from '../typeConstants';
import { saveUserToStorage } from '../actions/userActions';
import { isBefore, parseISOString } from '../../logic/TimeHelper';

/**
 * The type definition for the User redux reducer.
 */
export type UserReducer = {
  user: PillarsUser,
  unsavedChanges: boolean,
};

/**
 * The Initial State for the User Reducer
 *
 * @type {UserReducer}
 */
const initialState = {
  user: null,
  unsavedChanges: false,
};

/**
 * Deeply copies the User Reducer state. TODO
 *
 * @param {UserReducer} state The previous state to copy.
 * @return {UserReducer} state The copied state.
 */
const copyState = (state) => {
  return { ...state };
};

/**
 * User Reducer:
 *
 * This reducer handles all the user level states of the app. This includes personal info and history.
 *
 * @param {UserReducer} state The current state of the user reducer.
 * @param {{type: string, payload: *, asyncDispatch: function}} action The action to specify how to update the reducer.
 * @return {UserReducer} The next state for the reducer.
 */
export default (state: UserReducer = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      state = loadUser(state, action.payload.user);
      break;
    case SAVE_USER:
      state = saveUser(state);
      break;
    case ADD_PILLAR:
      state = addPillar(state, action.payload.index, action.payload.pillar);
      action.asyncDispatch(saveUserToStorage());
      break;
    case EDIT_PILLAR:
      state = editPillar(state, action.payload.index, action.payload.pillar);
      action.asyncDispatch(saveUserToStorage());
      break;
    case REMOVE_PILLAR:
      state = removePillar(state, action.payload.index);
      action.asyncDispatch(saveUserToStorage());
      break;
    case ADD_SUBMISSION:
      state = addSubmission(
        state,
        action.payload.index,
        action.payload.submission,
      );
      action.asyncDispatch(saveUserToStorage());
      break;
    case REMOVE_SUBMISSION:
      state = removeSubmission(state, action.payload.index);
      break;
    default:
      break;
  }
  return state;
};

/**
 * Loads the User into the reducer. Doesn't throw an error if has unsaved changes, but puts an error statement.
 *
 * @param {UserReducer} state The current state of the user reducer.
 * @param {PillarsUser} user The user to load into the reducer.
 * @return {UserReducer} The changed state of the user reducer.
 */
const loadUser = (state, user) => {
  state = copyState(state);
  if (state.unsavedChanges) {
    ERR && console.error('OVERWRITING UNSAVED CHANGES!?!?!?!');
  }
  state.user = user;
  return state;
};

/**
 * Indicates that the user has been saved and
 *
 * @param {UserReducer} state The current state of the user reducer.
 * @return {UserReducer} The changed state of the user reducer.
 */
const saveUser = (state) => {
  state = copyState(state);
  state.unsavedChanges = false;
  return state;
};

/**
 * Adds a new pillar to an index for the user.
 *
 * @param {UserReducer} state The current state of the user reducer.
 * @param {number} index The index to make for the new pillar, pushing the current index up one.
 * @param {Pillar} pillar The pillar to add to the user.
 * @return {UserReducer} The changed state of the user reducer.
 */
const addPillar = (state, index, pillar) => {
  state = copyState(state);
  if (index > state.user.pillars.length) {
    throw new Error('Attempting to add a pillar to an invalid index!');
  }
  // Add the pillar into the pillars array
  state.user.pillars.splice(index, 0, pillar);
  state.unsavedChanges = true;
  return state;
};

/**
 * Sets a pillar at a certain index for the user.
 *
 * @param {UserReducer} state The current state of the user reducer.
 * @param {number} index The index of the pillars list to edit for the user.
 * @param {Pillar} pillar The pillar object to set for the user.
 * @return {UserReducer} The changed state of the user reducer.
 */
const editPillar = (state, index, pillar) => {
  state = copyState(state);
  if (index >= state.user.pillars.length) {
    throw new Error('Attempting to edit a non-existant pillar!');
  }
  state.user.pillars[index] = pillar;
  state.unsavedChanges = true;
  return state;
};

/**
 * Removes a pillar from the user's pillars list.
 *
 * @param {UserReducer} state The current state of the user reducer.
 * @param {number} index The index of the pillars list to remove from the user.
 * @return {UserReducer} The changed state of the user reducer.
 */
const removePillar = (state, index) => {
  state = copyState(state);
  if (index >= state.user.pillars.length) {
    throw new Error('Attempting to remove a non-existant pillar!');
  }
  state.user.pillars.splice(index, 1);
  state.unsavedChanges = true;
  return state;
};

/**
 * Adds a submission to one of the User's pillars.
 *
 * @param {UserReducer} state The initial state for the user.
 * @param {number} pillarIndex The index for the pillar to add the submission for.
 * @param {PillarSubmission} submission The submission to add for the user.
 * @returns {UserReducer} The updated user state.
 */
const addSubmission = (state, pillarIndex, submission) => {
  const pillars = [...state.user.pillars];
  if (pillars.length < pillarIndex) {
    throw new Error(
      'Pillar Index not in bounds of pillars array for adding submission!',
    );
  }
  if (pillars[pillarIndex].submissions.length > 0) {
    if (
      !isBefore(
        parseISOString(pillars[pillarIndex].submissions[0].time_submitted),
      )
    ) {
      throw new Error('Submission not being placed in order!');
    }
  }
  pillars[pillarIndex].submissions = [
    submission,
    ...pillars[pillarIndex].submissions,
  ];
  return {
    ...state,
    user: {
      ...state.user,
      pillars,
    },
  };
};

/**
 * Removes the latest submission from one of the user's pillars.
 *
 * @param {UserReducer} state The initial state for the user.
 * @param {number} pillarIndex The index for the pillar to remove the submission for.
 * @returns {UserReducer} The updated user state.
 */
const removeSubmission = (state, pillarIndex) => {
  const pillars = [...state.user.pillars];
  if (pillars.length < pillarIndex) {
    throw new Error(
      'Pillar Index not in bounds of pillars array for removing submission!',
    );
  }
  pillars[pillarIndex].submissions = [...pillars[pillarIndex].submissions];
  pillars[pillarIndex].submissions.shift();
  return {
    ...state,
    user: {
      ...state.user,
      pillars,
    },
  };
};
