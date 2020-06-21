const SET_USER = 'SET_USER';
const SET_TASK = 'SET_TASK';
const SHOW_ACCOUNT_PAGE = 'SHOW_ACCOUNT_PAGE';
const TOOGGLE_IS_FETCHING = 'TOOGGLE_IS_FETCHING';

export const setCurrentUser = (userId) => ({ type: SET_USER, userId });
export const setCurrentTask = (taskId) => ({ type: SET_TASK, taskId });
export const showAccountPage = (accountPageIsVisible) => ({ type: SHOW_ACCOUNT_PAGE, accountPageIsVisible });
export const tooggleIsFetching = (isFetching) => ({ type: TOOGGLE_IS_FETCHING, isFetching });

const initialState = {
  currentUserId: null,
  currentTaskId: null,
  accountPageIsVisible: false,
  isFetching: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUserId: action.userId };
    case SET_TASK:
      return { ...state, currentUserId: action.taskId };
    case SHOW_ACCOUNT_PAGE:
      return { ...state, accountPageIsVisible: action.accountPageIsVisible };
    default:
      return state;
  }
};

export default appReducer;
