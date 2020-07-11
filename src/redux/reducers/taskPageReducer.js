import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import { setCurrentTask } from './appReducer';
import generateID from '../../helpers/generateID';

const SHOW_TASK_PAGE = 'SHOW_TASK_PAGE';
const SET_TASK_DATA = 'SET_TASK_DATA';
const SET_MEMBERS = 'SET_MEMBERS';
const SET_USERS_WITH_TASKS = 'SET_USERS_WITH_TASKS';

export const showTaskPage = (taskPageIsVisible) => ({ type: SHOW_TASK_PAGE, taskPageIsVisible });
export const setTaskData = (currentTaskData) => ({ type: SET_TASK_DATA, currentTaskData });
export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setUsersWithTasks = (usersWithTaskFromDB) => ({ type: SET_USERS_WITH_TASKS, usersWithTaskFromDB });

const initialState = {
  members: null,
  description: '',
  startDate: dateToStringForInput(new Date()),
  deadlineDate: dateToStringForInput(new Date(Date.now() + 604800000)), // number is the number of milliseconds in a week
  usersWithTaskFromDB: null,
  usersWithTaskLocal: null,
  userTasks: [],
  currentTaskData: null,
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
    dispatch(setUsersWithTasks(result));
  });
};

const taskPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_DATA:
      return { ...state, taskData: action.taskData };
    case SHOW_TASK_PAGE:
      return { ...state, taskPageIsVisible: action.taskPageIsVisible };
    case SET_USERS_WITH_TASKS:
      return {
        ...state,
        usersWithTaskFromDB: action.usersWithTaskFromDB,
        usersWithTaskLocal: action.usersWithTaskFromDB,
      };
    default:
      return state;
  }
};

export default taskPageReducer;
