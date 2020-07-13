const SET_USER_NAME = 'SET_USER_NAME';
const SET_CURRENT_TASK_NAME = 'SET_CURRENT_TASK_NAME';

export const setCurrentTaskName = (currentTaskName) => ({ type: SET_CURRENT_TASK_NAME, currentTaskName });

const initialState = {
  currentTaskName: null,
  // currentUserTaskId: null,
  taskData: [],
  firstName: null,
  lastName: null,
};

const memberTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, ...action.fullName };
    case SET_CURRENT_TASK_NAME:
      return { ...state, currentTaskName: action.currentTaskName };
    default:
      return state;
  }
};

export default memberTasksReducer;
