import axios from 'axios';
import { NEWS_SOURCE_ACTIONS, ERROR_ACTIONS } from './types';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import { multiParams } from './http/config';


const baseUrl = 'api/google_news/';

/**
 * CREATE NEWS_SOURCE
 * @param {object} newsSource 
 */
export const createNewsSource = (newsSource) => (dispatch, getState) => {

  dispatch({ type: NEWS_SOURCE_ACTIONS.CREATE });

  axios.post(baseUrl, newsSource, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({newsSourceAdded: 'News Source Added'}));
      dispatch({
        type: NEWS_SOURCE_ACTIONS.CREATE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => handleError(err, dispatch));
}

/**
 * GET NEWS_SOURCES
 */
export const getNewsSources = () => (dispatch, getState) => {
  axios.get(baseUrl, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: NEWS_SOURCE_ACTIONS.GET_ALL,
        payload: res.data
      });
    })
    .catch(err => handleError(err, dispatch));
}
