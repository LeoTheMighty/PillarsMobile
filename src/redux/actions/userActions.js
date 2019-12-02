import {
  LOAD_USER,
  SAVE_USER,
  ADD_PILLAR,
  EDIT_PILLAR,
  REMOVE_PILLAR, ADD_SUBMISSION, REMOVE_SUBMISSION,
} from '../typeConstants';
import UserStorage from '../../api/UserStorage';
import { newUser } from '../../logic/PillarsUserHelper';
import {setInfoModalOpen} from "./flowActions";

// For all the actions regarding the actual user using the app. (Will be used to access cloud storage of the User's
// progress and whatnot). May use API calls to retrieve info.

export const updateUser = (successHandler) => {
  return (dispatch) => {
    let user = UserStorage.loadUser();
    if (!user) {
      alert('Generating new user!');
      user = newUser();
      UserStorage.saveUser(user);
      dispatch(setInfoModalOpen(true));
    }
    dispatch(loadUser(user));
    successHandler && successHandler();
  };
};

// Save
/**
 *
 * @returns {Function}
 */
export const saveUserToStorage = () => {
  return (dispatch, getStore) => {
    UserStorage.saveUser(getStore().user.user);
    dispatch(saveUser());
  };
};

// Load

// Edit (in different ways)

// =============================
// == Low Level Redux Actions ==
// =============================

/**
 * Loads a User from storage into the app.
 *
 * @param user
 * @returns {{payload: {user: *}, type: *}}
 */
const loadUser = (user) => ({
  type: LOAD_USER,
  payload: {
    user,
  },
});

const saveUser = () => ({
  type: SAVE_USER,
});

export const addPillar = (pillar, index = 0) => ({
  type: ADD_PILLAR,
  payload: {
    index,
    pillar,
  },
});

export const editPillar = (index, pillar) => ({
  type: EDIT_PILLAR,
  payload: {
    index,
    pillar,
  },
});

export const deletePillar = (index) => ({
  type: REMOVE_PILLAR,
  payload: {
    index,
  },
});

export const addSubmission = (index, submission) => ({
  type: ADD_SUBMISSION,
  payload: {
    index,
    submission,
  },
});

export const removeSubmission = (index) => ({
  type: REMOVE_SUBMISSION,
  payload: {
    index,
  },
});
