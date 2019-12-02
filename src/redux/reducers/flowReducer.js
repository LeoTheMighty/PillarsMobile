import {
  SET_ADMIN_MODAL_OPEN,
  SET_CHECKING,
  SET_INFO_MODAL_OPEN,
  SET_INTERVAL_SPAN,
  SET_INTERVAL_VIEW,
} from '../typeConstants';
import { isDevelopment } from '../../logic/AppVariables';
import { ERR } from '../../logic/Constants';

/**
 *
 */
export type FlowReducer = {
  /** Whether the user is submitting submissions for the pillars. */
  isChecking: boolean,
  /** Whether the intro info modal is open or not. */
  infoModalOpen: boolean,
  /** Whether the admin modal is open or not. */
  adminModalOpen: boolean,
  /** The current interval being viewed in the pillars. */
  currentIntervalView: string,
  /** The current number of interval span are being viewed in the pillars. */
  currentIntervalSpan: number,
};

/**
 * The initial state for the flow reducer.
 *
 * @type {FlowReducer}
 */
const initialState: FlowReducer = {
  isChecking: false,
  infoModalOpen: false,
  adminModalOpen: false,
  currentIntervalView: 'week',
  currentIntervalSpan: 1,
};

/**
 * Copies the state for the Flow Reducer.
 *
 * @param {FlowReducer} state The current state of the flow reducer.
 * @return {FlowReducer} The copied state.
 */
const copyState = (state) => {
  return { ...state };
};

/**
 * TODO
 * @param state
 * @param action
 * @returns {FlowReducer}
 */
export default (state: FlowReducer = initialState, action) => {
  switch (action.type) {
    case SET_CHECKING:
      state = copyState(state);
      state.isChecking = action.payload.isChecking;
      break;
    case SET_INFO_MODAL_OPEN:
      state = copyState(state);
      state.infoModalOpen = action.payload.infoModalOpen;
      break;
    case SET_ADMIN_MODAL_OPEN:
      state = copyState(state);
      if (isDevelopment) {
        state.adminModalOpen = action.payload.adminModalOpen;
      } else {
        ERR && console.error('Cannot open admin modal in production mode!');
      }
      break;
    case SET_INTERVAL_VIEW:
      state = copyState(state);
      state.currentIntervalView = action.payload.intervalView;
      break;
    case SET_INTERVAL_SPAN:
      state = copyState(state);
      state.currentIntervalSpan = action.payload.intervalSpan;
      break;
    default:
      break;
  }
  return state;
};
