import { combineReducers } from 'redux';
import articles from './articles';
import events from './events';
import countries from './countries';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
  articles,
  events,
  countries,
  errors,
  messages,
  auth
});