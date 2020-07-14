import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const LOGOUT = 'LOGOUT';
const SET_ROLE = 'SET_ROLE';

export const logoutSuccess = () => ({ type: LOGOUT });
export const setRole = (userData) => ({ type: SET_ROLE, userData });

const initialState = {
  userId: null,
  isAuth: false,
  firstName: null,
  lastName: null,
  role: null,
  email: null,
};

export const login = (event, errors, values) => (dispatch) => {
  const { email, password, remember } = values;
  if (!errors.length) {
    firebaseApi.login(email, password, remember).then((result) => {
      if (result.message) {
        return showToast(result);
      }
      dispatch(setRole(result));
    });
  }
};

export const logout = () => (dispatch) => {
  firebaseApi
    .logout()
    .then(() => {
      sessionStorage.removeItem('user');
      dispatch(logoutSuccess());
    })
    .catch((result) => {
      return showToast(result);
    });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, isAuth: false, role: null, userId: null, firstName: null, lastName: null, email: null };
    case SET_ROLE:
      return {
        ...state,
        isAuth: true,
        ...action.userData,
      };
    default:
      return state;
  }
};

export default authReducer;
