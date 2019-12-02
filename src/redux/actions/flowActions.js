import {
  SET_ADMIN_MODAL_OPEN,
  SET_CHECKING,
  SET_INFO_MODAL_OPEN,
  SET_INTERVAL_SPAN,
  SET_INTERVAL_VIEW,
} from '../typeConstants';

/**
 * Redux action for setting the flow isChecking.
 *
 * @param {boolean} isChecking Whether the app will be checking for submissions.
 * @returns {{payload: {isChecking: *}, type: *}} The redux action information.
 */
export const setIsChecking = (isChecking) => ({
  type: SET_CHECKING,
  payload: {
    isChecking,
  },
});

/**
 * Redux action for setting the info modal open.
 *
 * @param {boolean} infoModalOpen Whether the info modal is open or not.
 * @returns {{payload: {infoModalOpen: *}, type: *}} The redux action information.
 */
export const setInfoModalOpen = (infoModalOpen) => ({
  type: SET_INFO_MODAL_OPEN,
  payload: {
    infoModalOpen,
  },
});

/**
 * Redux action for setting the admin modal open.
 *
 * @param {boolean} adminModalOpen Whether the admin modal is open or not.
 * @return {{payload: {adminModalOpen: *}, type: string}} The redux action info.
 */
export const setAdminModalOpen = (adminModalOpen) => ({
  type: SET_ADMIN_MODAL_OPEN,
  payload: {
    adminModalOpen,
  },
});

/**
 * Redux action for setting the current interval view.
 *
 * @param {string} intervalView The type of interval to view the pillars at.
 * @returns {{payload: {intervalView: *}, type: *}} The redux action info.
 */
export const setIntervalView = (intervalView) => ({
  type: SET_INTERVAL_VIEW,
  payload: {
    intervalView,
  },
});

/**
 * Redux action for setting the current interval span.
 *
 * @param {string} intervalSpan The number of interval spans to view the pillars at.
 * @returns {{payload: {intervalSpan: *}, type: *}} The redux action info.
 */
export const setIntervalSpan = (intervalSpan) => ({
  type: SET_INTERVAL_SPAN,
  payload: {
    intervalSpan,
  },
});
