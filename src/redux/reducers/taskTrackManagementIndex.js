import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import { toggleIsFetching } from './appIndex';

const SET_TRACK_DATA = 'SET_TRACK_DATA';
const SET_CURRENT_TASK_TRACK_ID = 'SET_CURRENT_TASK_TRACK_ID';
const SET_USER_TASK_ID = 'SET_USER_TASK_ID';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const CLEAR_TASK_TRACK_ID = 'CLEAR_TASK_TRACK_ID';

export const setError = (message) => ({ type: SET_ERROR_MESSAGE, message });
export const setTrackData = (trackData) => ({ type: SET_TRACK_DATA, trackData });
export const setCurrentTaskTrackId = (currentTaskTrackId) => ({ type: SET_CURRENT_TASK_TRACK_ID, currentTaskTrackId });
export const setUserTaskId = (userTaskId) => ({ type: SET_USER_TASK_ID, userTaskId });
export const clearTaskTrackId = () => ({ type: CLEAR_TASK_TRACK_ID });

const initialState = {
  currentTaskTrackId: null,
  trackData: null,
  userTaskId: null,
  message: null,
};

const taskTrackManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK_DATA:
      return { ...state, trackData: action.trackData };
    case SET_CURRENT_TASK_TRACK_ID:
      return { ...state, currentTaskTrackId: action.currentTaskTrackId };
    case SET_USER_TASK_ID:
      return { ...state, userTaskId: action.userTaskId };
    case SET_ERROR_MESSAGE:
      return { ...state, message: action.message };
    case CLEAR_TASK_TRACK_ID:
      return { ...state, currentTaskTrackId: null };

    default:
      return state;
  }
};

export const getTrackData = (currentUserId) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  firebaseApi
    .getTrackDataArray(currentUserId)
    .then((result) => {
      if (result.message) {
        return showToast(result);
      }
      dispatch(setTrackData(result));
    })
    .then(() => {
      dispatch(toggleIsFetching(false));
    });
};

export default taskTrackManagementReducer;
