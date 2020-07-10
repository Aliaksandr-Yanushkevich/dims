import firebaseApi from '../../api/firebaseApi';
// import showToast from '../../helpers/showToast';

const SET_MEMBERS = 'SET_MEMBERS';
const SET_DIRECTIONS = 'SET_DIRECTIONS';
const SHOW_MEMBER_PAGE = 'SHOW_MEMBER_PAGE';
const SET_MESSAGE = 'SET_MESSAGE';

export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setDirections = (directions) => ({ type: SET_DIRECTIONS, directions });
export const showMemberPage = (memberPageIsVisible) => ({ type: SHOW_MEMBER_PAGE, memberPageIsVisible });
export const setMessage = (message) => ({ type: SET_MESSAGE, message });

const initialState = {
  members: null,
  directions: null,
  memberPageIsVisible: false,
  message: null,
};

export const getMembers = () => (dispatch) => {
  firebaseApi.getUsers().then((result) => {
    if (result.hasOwnProperty('message')) {
      dispatch(setMessage(result));
    } else {
      dispatch(setMembers(result));
      dispatch(setMessage(null));
    }
  });
};

export const getDirections = () => (dispatch) => {
  firebaseApi.getDirections().then((result) => {
    dispatch(setDirections(result));
  });
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBERS:
      return { ...state, members: action.members };
    case SET_DIRECTIONS:
      return { ...state, directions: action.directions };
    case SHOW_MEMBER_PAGE:
      return { ...state, memberPageIsVisible: action.memberPageIsVisible };
    case SET_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export default membersReducer;
