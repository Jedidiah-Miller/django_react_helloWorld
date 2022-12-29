import axios from 'axios';
import { ARTICLE_ACTIONS, ERROR_ACTIONS } from './types';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { multiParams } from './http/config';


const baseUrl = 'api/news_sources/'

// /**
//  * CREATE EVENT
//  * @param {object} event 
//  */
// export const createEvent = (event) => (dispatch, getState) => {
//   axios.post('api/articles/', event, tokenConfig(getState))
//     .then(res => {
//       // dispatch(createMessage({leadAdded: 'Event Added'}));
//       dispatch({
//         type: EVENT_ACTIONS.CREATE,
//         payload: res.data
//       });
//     })
//     .catch(err => handleError(err, dispatch));
// }

/**
 * GET articles
 */
export const getArticles = (q = null) => (dispatch, getState) => {

  dispatch({type: ARTICLE_ACTIONS.GET_ALL});
  axios.get(baseUrl, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ARTICLE_ACTIONS.GET_ALL_SUCCESS,
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
  axios.delete(`api/articles/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({leadDeleted: 'Event Deleted'}));
      dispatch({
        type: EVENT_ACTIONS.DELETE,
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