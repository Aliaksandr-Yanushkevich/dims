import firebaseApi from '../../api/firebaseApi';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import showToast from '../../helpers/showToast';
import { setCurrentUser } from './appReducer';

const SET_USER_INFO = 'SET_USER_INFO';
const ON_CHANGE = 'ON_CHANGE';
const SHOW_MEMBER_PAGE = 'SHOW_MEMBER_PAGE';
const CLEAR_MEMBER_PAGE = 'CLEAR_MEMBER_PAGE';

export const setUserInfo = (userInfo) => ({ type: SET_USER_INFO, userInfo });
export const onChangeValue = (fieldName, value) => ({ type: ON_CHANGE, [fieldName]: value });
export const showMemberPage = (memberPageIsVisible) => ({ type: SHOW_MEMBER_PAGE, memberPageIsVisible });
export const clearMemberPage = () => ({ type: CLEAR_MEMBER_PAGE });

const initialState = {
  firstName: '',
  lastName: '',
  sex: '',
  mobilePhone: '',
  email: '',
  startDate: dateToStringForInput(new Date()),
  skype: '',
  birthDate: '',
  directionId: '',
  address: '',
  education: '',
  mathScore: '',
  universityAverageScore: '',
  memberPageIsVisible: false,
};

export const getUserInfo = (currentUserId) => (dispatch) => {
  firebaseApi.getUserInfo(currentUserId).then((result) => {
    if (result.message) {
      return showToast(result);
    }
    dispatch(setUserInfo(result));
    dispatch(setCurrentUser(result.userId));
  });
};

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...action.userInfo,
        startDate: dateToStringForInput(action.userInfo.startDate.toDate()),
        birthDate: dateToStringForInput(action.userInfo.birthDate.toDate()),
      };
    case ON_CHANGE:
      const { type, ...rest } = action;
      return {
        ...state,
        ...rest,
      };
    case SHOW_MEMBER_PAGE:
      return { ...state, memberPageIsVisible: action.memberPageIsVisible };
    case CLEAR_MEMBER_PAGE:
      return initialState;
    default:
      return state;
  }
};

export default membersReducer;
