import { AsyncStorage } from 'react-native';

/**
 * Short-term storage for the state of the flow of the app and for non-essential info.
 */
class StateStorage {
  // The key to access the information
  static storageKey = 'state';

  /**
   * Retrieves a user object from storage.
   *
   * @return {PillarsUser | null} The user object retrieved from the storage or null if there was no user object found.
   */
  static loadState() {
    const userJSON = localStorage.getItem(StateStorage.storageKey);
    return userJSON ? JSON.parse(userJSON) : null;
  }

  /**
   * Saves a user object into storage.
   *
   * @param {PillarsUser} user The user object to save into the storage.
   * @returns {void} The result of saving the state.
   */
  static saveState(user) {
    localStorage.setItem(StateStorage.storageKey, JSON.stringify(user));
  }
}

export default StateStorage;
