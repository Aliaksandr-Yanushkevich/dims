import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import logger from 'redux-logger';
import membersReducer from './reducers/membersReducer';
import authReducer from './reducers/authReducer';
import appReducer from './reducers/appReducer';
import taskPageReducer from './reducers/taskPageReducer';
import memberPageReducer from './reducers/memberPageReducer';
import membersTasksReducer from './reducers/memberTasksReducer';
import taskManagementReducer from './reducers/taskManagementReducer';
import taskTrackManagementReducer from './reducers/taskTrackManagementReducer';
import taskTrackPageReducer from './reducers/taskTrackPageReducer';
import deleteConfirmationReducer from './reducers/deleteConfirmationReducer';

const reducers = combineReducers({
  app: appReducer,
  members: membersReducer,
  auth: authReducer,
  taskPage: taskPageReducer,
  memberPage: memberPageReducer,
  memberTasks: membersTasksReducer,
  taskManagement: taskManagementReducer,
  taskTrackManagement: taskTrackManagementReducer,
  taskTrackPage: taskTrackPageReducer,
  deleteConfirmation: deleteConfirmationReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare, logger));

export default store;
