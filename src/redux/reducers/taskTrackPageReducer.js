import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import { toggleIsFetching } from './appReducer';

const SHOW_TASK_TRACK_PAGE = 'SHOW_TASK_TRACK_PAGE';

export const showTaskTrackPage = (taskTrackPageIsVisible) => ({ type: SHOW_TASK_TRACK_PAGE, taskTrackPageIsVisible });

const initialState = {
  taskTrackPageIsVisible: false,
};

const taskTrackPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TASK_TRACK_PAGE:
      return { ...state, taskTrackPageIsVisible: action.taskTrackPageIsVisible };

    default:
      return state;
  }
};

export default taskTrackPageReducer;
