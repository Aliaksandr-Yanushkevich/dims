import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import { toggleIsFetching } from './appReducer';

const SET_TRACK_DATA = 'SET_TRACK_DATA';
const SET_CURRENT_TASK_TRACK_ID = 'SET_CURRENT_TASK_TRACK_ID';

export const setTrackData = (trackData) => ({ type: SET_TRACK_DATA, trackData });
export const setCurrentTaskTrackId = (currentTaskTrackId) => ({ type: SET_CURRENT_TASK_TRACK_ID, currentTaskTrackId });

const initialState = {
  currentTaskTrackId: null,
  trackData: null,
};

export const getTrackData = (currentUserId) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  firebaseApi
    .getTrackDataArray(currentUserId)
    .then((result) => {
      if (result.hasOwnProperty('message')) {
        return showToast(result);
      }
      dispatch(setTrackData(result));
    })
    .then(() => {
      dispatch(toggleIsFetching(false));
    });
};

const taskTrackManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK_DATA:
      return { ...state, trackData: action.trackData };
    case SET_CURRENT_TASK_TRACK_ID:
      return { ...state, currentTaskTrackId: action.currentTaskTrackId };

    default:
      return state;
  }
};

export default taskTrackManagementReducer;
