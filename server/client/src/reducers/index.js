import { combineReducers } from 'redux';
import articles from './articles';
import events from './events';
import newsSources from './newsSources';
import countries from './countries';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
  articles,
  events,
  newsSources,
  countries,
  errors,
  messages,
  auth
});