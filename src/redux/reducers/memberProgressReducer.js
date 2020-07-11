import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const SET_USER_INFO = 'SET_USER_INFO ';
const SET_USER_TASKS = 'SET_USER_TASKS';

export const setUserInfo = (currentUserFirstName, currentUserLastName) => ({
  type: SET_USER_INFO,
  currentUserFirstName,
  currentUserLastName,
});
export const setUserTasks = (taskData) => ({ type: SET_USER_TASKS, taskData });

const initialState = {
  currentUserFirstName: null,
  currentUserLastName: null,
  taskData: null,
};

export const getUserInfo = (currentUserId) => (dispatch) => {
  firebaseApi.getUserInfo(currentUserId).then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    } else {
      const { firstName, lastName } = result;
      dispatch(setUserInfo(firstName, lastName));
    }
  });
};

export const getUserTasksList = (currentUserId) => (dispatch) => {
  firebaseApi.getUserTaskList(currentUserId).then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    } else {
      dispatch(setUserTasks(result));
    }
  });
};

const membersProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        currentUserFirstName: action.currentUserFirstName,
        currentUserLastName: action.currentUserLastName,
      };
    case SET_USER_TASKS:
      return { ...state, taskData: action.taskData };
    default:
      return state;
  }
};

export default membersProgressReducer;
