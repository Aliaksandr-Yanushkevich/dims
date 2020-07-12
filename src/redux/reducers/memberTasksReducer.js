import { setCurrentTask } from './appReducer';

const SET_USER_NAME = 'SET_USER_NAME';
const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
const SET_CURRENT_TASK_NAME = 'SET_CURRENT_TASK_NAME';
const SHOW_TASK_TRACK_PAGE = 'SHOW_TRACK_PAGE';
const TOGGLE_IS_FETCHING = 'TOOGGLE_IS_FETCHING';

export const showTaskTrackPage = (taskTrackPageIsVisible) => ({ type: SHOW_TASK_TRACK_PAGE, taskTrackPageIsVisible });
export const setCurrentTaskName = (currentTaskName) => ({ type: SET_CURRENT_TASK_NAME, currentTaskName });
export const trackTask = (currentTaskName, currentTaskId) => {
  setCurrentTaskName(currentTaskName);
  showTaskTrackPage(true);
  setCurrentTask(currentTaskId);
};

const initialState = {
  currentTaskName: null,
  currentUserTaskId: null,
  taskData: [],
  firstName: null,
  lastName: null,
  taskTrackPageIsVisible: false,
  isFetching: false,
};

const memberTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, ...action.fullName };
    case SET_CURRENT_TASK:
      return { ...state, currentUserId: action.taskId };
    case SHOW_TASK_TRACK_PAGE:
      return { ...state, taskTrackPageIsVisible: action.taskTrackPageIsVisible };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};

export default memberTasksReducer;
