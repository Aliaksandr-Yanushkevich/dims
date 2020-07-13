import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const SET_TASK_LIST = 'SET_TASK_LIST';

export const setTaskList = (taskList) => ({ type: SET_TASK_LIST, taskList });

const initialState = {
  taskList: null,
};

export const getTaskList = () => (dispatch) => {
  firebaseApi.getTaskList().then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    }
    dispatch(setTaskList(result));
  });
};

const taskManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_LIST:
      return { ...state, taskList: action.taskList };
    default:
      return state;
  }
};

export default taskManagementReducer;
