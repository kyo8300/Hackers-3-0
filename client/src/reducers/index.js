import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import modal from './modal';
import post from './post';
import community from './community';
import profile from './profile';

export default combineReducers({
  auth,
  alert,
  modal,
  post,
  community,
  profile
});
