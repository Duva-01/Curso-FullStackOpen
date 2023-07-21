import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blogsReducer from './blogsReducer';
import notificationReducer from './notificationReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
