const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
const SHOW_ACCOUNT_PAGE = 'SHOW_ACCOUNT_PAGE';
const TOGGLE_IS_FETCHING = 'TOOGGLE_IS_FETCHING';

export const setCurrentUser = (userId) => ({ type: SET_CURRENT_USER, userId });
export const setCurrentTask = (taskId) => ({ type: SET_CURRENT_TASK, taskId });
export const showAccountPage = (accountPageIsVisible) => ({ type: SHOW_ACCOUNT_PAGE, accountPageIsVisible });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

const initialState = {
  currentUserId: null,
  currentTaskId: null,
  currentTaskName: null,
  accountPageIsVisible: false,
  isFetching: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUserId: action.userId };
    case SET_CURRENT_TASK:
      return { ...state, currentUserId: action.taskId };
    case SHOW_ACCOUNT_PAGE:
      return { ...state, accountPageIsVisible: action.accountPageIsVisible };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};

export default appReducer;
