import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const SET_USER_INFO = 'SET_USER_INFO ';
const SET_USER_TASKS = 'SET_USER_TASKS';

export const setUserInfo = (currentUserFirstName, currentUserLastName) => ({
  type: SET_USER_INFO,
  currentUserFirstName,
  currentUserLastName,
});
export const setUserTasks = (userTasks) => ({ type: SET_USER_TASKS, userTasks });

const initialState = {
  currentUserFirstName: null,
  currentUserLastName: null,
  userTasks: null,
};

export const getUserInfo = (currentUserId) => (dispatch) => {
  firebaseApi.getUserInfo(currentUserId).then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    }
    const { firstName, lastName } = result;
    dispatch(setUserInfo(firstName, lastName));
  });
};

export const getUserTasksList = (currentUserId) => (dispatch) => {
  firebaseApi.getUserTaskList(currentUserId).then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    }
    dispatch(setUserTasks(result));
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
      return { ...state, userTasks: action.userTasks };
    default:
      return state;
  }
};

export default membersProgressReducer;
