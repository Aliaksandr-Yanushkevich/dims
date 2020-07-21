const SET_TASK_LIST = 'SET_TASK_LIST';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const setError = (message) => ({ type: SET_ERROR_MESSAGE, message });
export const setTaskList = (taskList) => ({ type: SET_TASK_LIST, taskList });

const initialState = {
  taskList: null,
  message: null,
};

const taskManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_LIST:
      return { ...state, taskList: action.taskList };
    case SET_ERROR_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default taskManagementReducer;
