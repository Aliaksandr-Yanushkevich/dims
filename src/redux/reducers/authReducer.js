import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_ROLE = 'SET_ROLE';
// const REMEMBER = 'REMEMBER';

export const loginSuccess = () => ({ type: LOGIN });
export const logoutSuccess = () => ({ type: LOGOUT });
export const setRole = (userData) => ({ type: SET_ROLE, userData });
// export const isRemember = (remember) => ({ type: REMEMBER, remember });

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
      if (result.hasOwnProperty('message')) {
        return showToast(result);
      }
      dispatch(loginSuccess());
      // dispatch(isRemember(remember));
    });
  }
};

export const logout = () => (dispatch) => {
  firebaseApi
    .logout()
    .then(() => {
      sessionStorage.removeItem('user');
      dispatch(logoutSuccess());
      console.log('Logged out');
    })
    .catch((error) => {
      console.error('Logout error', error);
    });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuth: true };
    case LOGOUT:
      return { ...state, isAuth: false };
    case SET_ROLE:
      return {
        ...state,
        isAuth: true,
        ...action.userData,
      };
    // case REMEMBER:
    //   return { ...state, isRemember: action.remember };
    default:
      return state;
  }
};

export default authReducer;
