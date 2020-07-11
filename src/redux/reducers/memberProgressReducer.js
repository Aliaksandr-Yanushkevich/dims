import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import { toggleIsFetching } from './appReducer';

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

// should use Promise.all for getUserInfo & getUserTasksList then dispatch  dispatch(tooggleIsFetching(false))
export const getUserInfo = (currentUserId) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  firebaseApi
    .getUserInfo(currentUserId)
    .then((result) => {
      if (result.hasOwnProperty('message')) {
        return showToast(result);
      }
      const { firstName, lastName } = result;
      dispatch(setUserInfo(firstName, lastName));
    })
    .then(() => {
      dispatch(toggleIsFetching(false));
    });
};

export const getUserTasksList = (currentUserId) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  firebaseApi
    .getUserTaskList(currentUserId)
    .then((result) => {
      if (result.hasOwnProperty('message')) {
        return showToast(result);
      }
      dispatch(setUserTasks(result));
    })
    .then(() => {
      dispatch(toggleIsFetching(false));
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
