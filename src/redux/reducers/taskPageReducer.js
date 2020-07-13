import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import generateID from '../../helpers/generateID';

const SHOW_TASK_PAGE = 'SHOW_TASK_PAGE';
const SET_TASK_DATA = 'SET_TASK_DATA';
const SET_MEMBERS = 'SET_MEMBERS';
const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
const ON_CHANGE = 'ON_CHANGE';
const SET_USERS_WITH_TASK = 'SET_USERS_WITH_TASK';
const SET_USERS_WITH_TASK_FROM_DB = 'SET_USERS_WITH_TASK_FROM_DB';
const SET_USER_TASK = 'SET_USER_TASK';
const CLEAR_USER_TASKS = 'CLEAR_USER_TASKS';

export const showTaskPage = (taskPageIsVisible) => ({ type: SHOW_TASK_PAGE, taskPageIsVisible });
export const setTaskData = (currentTaskData) => ({
  type: SET_TASK_DATA,
  currentTaskData,
});

export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setUsersWithTaskFromDB = (usersWithTask) => ({ type: SET_USERS_WITH_TASK_FROM_DB, usersWithTask });
export const setUsersWithTask = (usersWithTask) => ({ type: SET_USERS_WITH_TASK, usersWithTask });
export const setCurrentTask = (taskId) => ({ type: SET_CURRENT_TASK, taskId });
export const onChangeValue = (fieldName, value) => ({ type: ON_CHANGE, [fieldName]: value });
export const setUserTasks = (userTasks) => ({ type: SET_USER_TASK, userTasks });
export const clearUserTasks = () => ({ type: CLEAR_USER_TASKS });

const initialState = {
  members: null,
  taskId: null,
  name: null,
  description: null,
  startDate: dateToStringForInput(new Date()),
  deadlineDate: dateToStringForInput(new Date(Date.now() + 604800000)), // number is the number of milliseconds in a week
  usersWithTaskFromDB: null,
  usersWithTaskLocal: null,
  userTasks: [],
  taskPageIsVisible: false,
};

export const getTask = (currentTaskId) => (dispatch) => {
  if (currentTaskId && currentTaskId !== 'newTask') {
    setCurrentTask(currentTaskId);
    firebaseApi.getTask(currentTaskId).then((result) => {
      if (result.hasOwnProperty('message')) {
        return showToast(result);
      }
      dispatch(setTaskData(result));
    });
  } else {
    setCurrentTask(generateID());
  }
};

export const getMembers = () => (dispatch) => {
  firebaseApi.getNames().then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    }
    dispatch(setMembers(result));
  });
};

export const getUsersWithTask = (currentTaskId) => (dispatch) => {
  firebaseApi.getUsersWithTask(currentTaskId).then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    }
    dispatch(setUsersWithTaskFromDB(result));
  });
};

const taskPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TASK:
      return { ...state, taskId: action.taskId };
    case SET_TASK_DATA:
      return { ...state, ...action.currentTaskData };
    case SHOW_TASK_PAGE:
      return { ...state, taskPageIsVisible: action.taskPageIsVisible };
    case SET_USERS_WITH_TASK_FROM_DB:
      return {
        ...state,
        usersWithTaskFromDB: action.usersWithTask,
        usersWithTaskLocal: action.usersWithTask,
      };
    case SET_USERS_WITH_TASK:
      return {
        ...state,
        usersWithTaskLocal: action.usersWithTask,
      };
    case ON_CHANGE:
      const { type, ...rest } = action;
      return {
        ...state,
        ...rest,
      };
    case SET_USER_TASK:
      return { ...state, userTasks: action.userTasks };
    case SET_MEMBERS:
      return { ...state, members: action.members };
    case CLEAR_USER_TASKS:
      return { ...state, userTasks: [] };
    default:
      return state;
  }
};

export default taskPageReducer;
