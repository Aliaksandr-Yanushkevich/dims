import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import membersReducer from './reducers/membersReducer';
import authReducer from './reducers/authReducer';
import appReducer from './reducers/appReducer';

const reducers = combineReducers({
  app: appReducer,
  members: membersReducer,
  auth: authReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
