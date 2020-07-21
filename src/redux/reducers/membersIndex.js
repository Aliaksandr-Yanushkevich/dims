import firebaseApi from '../../api/firebaseApi';

const SET_MEMBERS = 'SET_MEMBERS';
const SET_DIRECTIONS = 'SET_DIRECTIONS';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const setMembers = (members) => ({ type: SET_MEMBERS, members });
export const setDirections = (directions) => ({ type: SET_DIRECTIONS, directions });
export const setError = (message) => ({ type: SET_ERROR_MESSAGE, message });

const initialState = {
  members: null,
  directions: null,
  message: null,
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBERS:
      return { ...state, members: action.members };
    case SET_DIRECTIONS:
      return { ...state, directions: action.directions };
    case SET_ERROR_MESSAGE:
      return { ...state, message: action.message };
    default:
      return state;
  }
};

export const getDirections = () => (dispatch) => {
  firebaseApi.getDirections().then((result) => {
    if (result.message) {
      dispatch(setError(result.message));
    } else {
      dispatch(setDirections(result));
    }
  });
};

export default membersReducer;
