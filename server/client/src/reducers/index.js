import { combineReducers } from 'redux';
import articles from './articles';
import leads from './leads';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
  articles,
  leads,
  errors,
  messages,
  auth
});