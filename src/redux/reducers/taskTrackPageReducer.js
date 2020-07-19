import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import { toggleIsFetching } from './appReducer';

const SHOW_TASK_TRACK_PAGE = 'SHOW_TASK_TRACK_PAGE';
const SET_TASK_TRACK = 'SET_TASK_TRACK';
const ON_CHANGE = 'ON_CHANGE';
const CLEAR_TASK_TRACK_PAGE = 'CLEAR_TASK_TRACK_PAGE';

export const showTaskTrackPage = (taskTrackPageIsVisible) => ({ type: SHOW_TASK_TRACK_PAGE, taskTrackPageIsVisible });
export const setTrackNote = (trackNote) => ({ type: SET_TASK_TRACK, trackNote });
export const onChangeValue = (fieldName, value) => ({ type: ON_CHANGE, [fieldName]: value });
export const clearTaskTrackPage = () => ({ type: CLEAR_TASK_TRACK_PAGE });

export const getTaskTrack = (taskTrackId) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  firebaseApi
    .getTaskTrack(taskTrackId)
    .then((result) => {
      if (result.message) {
        return showToast(result);
      }
      dispatch(setTrackNote(result));
    })
    .then(() => {
      dispatch(toggleIsFetching(false));
    });
};

const initialState = {
  taskTrackPageIsVisible: false,
  trackNote: '',
  trackDate: dateToStringForInput(new Date()),
};

const taskTrackPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TASK_TRACK_PAGE:
      return { ...state, taskTrackPageIsVisible: action.taskTrackPageIsVisible };
    case SET_TASK_TRACK:
      return { ...state, trackNote: action.trackNote };
    case ON_CHANGE:
      const { type, ...rest } = action;
      return {
        ...state,
        ...rest,
      };
    case CLEAR_TASK_TRACK_PAGE:
      return initialState;

    default:
      return state;
  }
};

export default taskTrackPageReducer;
