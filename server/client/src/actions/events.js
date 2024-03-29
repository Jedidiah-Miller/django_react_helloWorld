import axios from 'axios';
import { EVENT_ACTIONS, ERROR_ACTIONS } from './types';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { multiParams } from './http/config';


const baseUrl = 'api/events';

/**
 * CREATE EVENT
 * @param {object} event 
 */
export const createEvent = (event) => (dispatch, getState) => {
  axios.post(baseUrl, event, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({eventAdded: 'Event Added'}));
      dispatch({
        type: EVENT_ACTIONS.CREATE,
        payload: res.data
      });
    })
    .catch(err => handleError(err, dispatch));
}

/**
 * GET EVENTS
 */
export const getEvents = () => (dispatch, getState) => {
  axios.get(baseUrl, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EVENT_ACTIONS.GET_ALL,
        payload: res.data
      });
    })
    .catch(err => handleError(err, dispatch));
}

/**
 * DELETE EVENT
 * @param {String} id 
 */
export const deleteEvent = (id) => (dispatch, getState) => {
  // dispatch({type: EVENT_ACTIONS.DELETE, payload: id});
  const params = multiParams({id})
  axios.delete(`${baseUrl}?${params}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({eventDeleted: 'Event Deleted'}));
      dispatch({
        type: EVENT_ACTIONS.DELETE,
        payload: id
      });
    })
    .catch(err => console.error(err));
}

/**
 * get EVENT
 * @param {String} id 
 */
export const getEvent = (id) => (dispatch, getState) => {
  // dispatch({type: EVENT_ACTIONS.GET_ONE, payload: id});
  const params = multiParams({id})
  axios.get(`${baseUrl}?${params}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({eventDeleted: 'Event Deleted'}));
      dispatch({
        type: EVENT_ACTIONS.GET_ONE_SUCCESS,
        payload: id
      });
    })
    .catch(err => console.error(err));
}

/**
 * 
 * @param {Error} err 
 * @param {dispatch} dispatch 
 */
function handleError(err, dispatch) {
  // old
  // const errors = {
  //   msg: err.response.data,
  //   status: err.response.status
  // };
  // dispatch({
  //   type: ERROR_ACTIONS.GET,
  //   payload: errors
  // });
  const msg = err.response.data;
  const status = err.response.status;
  dispatch(returnErrors(msg, status))
}