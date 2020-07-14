import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
const SHOW_ACCOUNT_PAGE = 'SHOW_ACCOUNT_PAGE';
const TOGGLE_IS_FETCHING = 'TOOGGLE_IS_FETCHING';
const SET_USER_INFO = 'SET_USER_INFO ';
const SET_USER_TASKS = 'SET_USER_TASKS';

export const setCurrentUser = (userId) => ({ type: SET_CURRENT_USER, userId });
export const setCurrentTask = (taskId) => ({ type: SET_CURRENT_TASK, taskId });
export const showAccountPage = (accountPageIsVisible) => ({ type: SHOW_ACCOUNT_PAGE, accountPageIsVisible });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const setUserTasks = (userTasks) => ({ type: SET_USER_TASKS, userTasks });
export const setUserInfo = (currentUserFirstName, currentUserLastName) => ({
  type: SET_USER_INFO,
  currentUserFirstName,
  currentUserLastName,
});

const initialState = {
  currentUserId: null,
  currentTaskId: null,
  currentUserFirstName: null,
  currentUserLastName: null,
  accountPageIsVisible: false,
  userTasks: null,
  isFetching: false,
};

export const getUserInfo = (currentUserId) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  firebaseApi
    .getUserInfo(currentUserId)
    .then((result) => {
      if (result.message) {
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
      if (result.message) {
        return showToast(result);
      }
      dispatch(setUserTasks(result));
    })
    .then(() => {
      dispatch(toggleIsFetching(false));
    });
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUserId: action.userId };
    case SET_CURRENT_TASK:
      return { ...state, currentTaskId: action.taskId };
    case SHOW_ACCOUNT_PAGE:
      return { ...state, accountPageIsVisible: action.accountPageIsVisible };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
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

export default appReducer;
