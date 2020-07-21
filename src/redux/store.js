import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import logger from 'redux-logger';
import membersReducer from './reducers/membersIndex';
import authReducer from './reducers/authIndex';
import appReducer from './reducers/appIndex';
import taskPageReducer from './reducers/taskPageIndex';
import memberPageReducer from './reducers/memberPageIndex';
import membersTasksReducer from './reducers/memberTasksIndex';
import taskManagementReducer from './reducers/taskManagementIndex';
import taskTrackManagementReducer from './reducers/taskTrackManagementIndex';
import taskTrackPageReducer from './reducers/taskTrackPageIndex';
import deleteConfirmationReducer from './reducers/deleteConfirmationIndex';

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
