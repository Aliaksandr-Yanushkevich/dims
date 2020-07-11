import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const SHOW_TASK_PAGE = 'SHOW_TASK_PAGE';
const SET_TASK_DATA = 'SET_TASK_DATA';

export const showTaskPage = (taskPageIsVisible) => ({ type: SHOW_TASK_PAGE, taskPageIsVisible });
export const setTaskData = (taskData) => ({ type: SET_TASK_DATA, taskData });

const initialState = {
  taskData: null,
  taskPageIsVisible: false,
};

export const getTask = (currentTaskId) => (dispatch) => {
  firebaseApi.getTask(currentTaskId).then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    } else {
      dispatch(setTaskData(result));
    }
  });
};

const taskPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_DATA:
      return { ...state, taskData: action.taskData };
    case SHOW_TASK_PAGE:
      return { ...state, memberPageIsVisible: action.taskPageIsVisible };
    default:
      return state;
  }
};

export default taskPageReducer;
