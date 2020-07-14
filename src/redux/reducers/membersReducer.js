import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const SET_MEMBERS = 'SET_MEMBERS';
const SET_DIRECTIONS = 'SET_DIRECTIONS';
const SHOW_MEMBER_PAGE = 'SHOW_MEMBER_PAGE';

export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setDirections = (directions) => ({ type: SET_DIRECTIONS, directions });

const initialState = {
  members: null,
  directions: null,
};

export const getMembers = () => (dispatch) => {
  firebaseApi.getUsers().then((result) => {
    if (result.hasOwnProperty('message')) {
      return showToast(result);
    }
    dispatch(setMembers(result));
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
    default:
      return state;
  }
};

export default membersReducer;
