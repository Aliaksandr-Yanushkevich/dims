import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import membersReducer from './reducers/membersReducer';
import authReducer from './reducers/authReducer';
import appReducer from './reducers/appReducer';
import memberProgressReducer from './reducers/memberProgressReducer';
import taskPageReducer from './reducers/taskPageReducer';
import memberPageReducer from './reducers/memberPageReducer';

const reducers = combineReducers({
  app: appReducer,
  members: membersReducer,
  auth: authReducer,
  memberProgress: memberProgressReducer,
  taskPage: taskPageReducer,
  memberPage: memberPageReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
