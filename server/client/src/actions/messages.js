import { MESSAGE_ACTIONS, ERROR_ACTIONS } from './types';

/**
 * CREATE MESSAGE
 */
export const createMessage = (msg) => {
  return {
    type: MESSAGE_ACTIONS.CREATE_MESSAGE,
    payload: msg
  };
};

export const returnErrors = (msg, status) => {
  return {
    type: ERROR_ACTIONS.GET,
    payload: { msg, status }
  };
};