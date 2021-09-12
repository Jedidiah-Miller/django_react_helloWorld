import axios from 'axios';
import { LEAD_ACTIONS, ERROR_ACTIONS } from './types';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';


/**
 * CREATE LEAD
 * @param {object} lead 
 */
export const createLead = (lead) => (dispatch, getState) => {
  axios.post('api/leads/', lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({leadAdded: 'Lead Added'}));
      dispatch({
        type: LEAD_ACTIONS.CREATE,
        payload: res.data
      });
    })
    .catch(err => handleError(err, dispatch));
}

/**
 * GET LEADS
 */
export const getLeads = () => (dispatch, getState) => {
  axios.get('api/leads/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LEAD_ACTIONS.GET_ALL,
        payload: res.data
      });
    })
    .catch(err => handleError(err, dispatch));
}

/**
 * DELETE LEAD
 * @param {String} id 
 */
export const deleteLead = (id) => (dispatch, getState) => {
  axios.delete(`api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({leadDeleted: 'Lead Deleted'}));
      dispatch({
        type: LEAD_ACTIONS.DELETE,
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