import { combineReducers } from 'redux';
import articles from './articles';
import events from './events';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
  articles,
  events,
  errors,
  messages,
  auth
});