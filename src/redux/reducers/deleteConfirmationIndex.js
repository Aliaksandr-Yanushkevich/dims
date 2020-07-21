const SET_FUNCTION = 'SET_FUNCTION';
const SET_PARAMETERS = 'SET_PARAMETERS';
const SHOW_DELETE_CONFIRMATION = 'SHOW_DELETE_CONFIRMATION';

export const setFunction = (func) => ({ type: SET_FUNCTION, func });
export const setParameters = (params) => ({ type: SET_PARAMETERS, params });
export const showDeleteConfirmation = (deleteConfirmationIsVisible) => ({
  type: SHOW_DELETE_CONFIRMATION,
  deleteConfirmationIsVisible,
});

const initialState = {
  deleteConfirmationIsVisible: false,
  func: null,
  params: null,
};

const deleteConfirmationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FUNCTION:
      return { ...state, func: action.func };
    case SET_PARAMETERS:
      return { ...state, params: action.params };
    case SHOW_DELETE_CONFIRMATION:
      return { ...state, deleteConfirmationIsVisible: action.deleteConfirmationIsVisible };
    default:
      return state;
  }
};

export default deleteConfirmationReducer;
