import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import post from './post';
import community from './community';

export default combineReducers({
  auth,
  alert,
  post,
  community
});
