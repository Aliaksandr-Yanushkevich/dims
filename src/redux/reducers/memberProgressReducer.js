import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import { toggleIsFetching } from './appReducer';

const initialState = {};

// should use Promise.all for getUserInfo & getUserTasksList then dispatch  dispatch(tooggleIsFetching(false))

const membersProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default membersProgressReducer;
