import axios from 'axios';
import { COUNTRY_ACTIONS, ERROR_ACTIONS } from './types';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';


const baseUrl = 'api/countries';

/**
 * GET all countries
 */
export const getAllCountries = () => (dispatch, getState) => {

  dispatch({ type: COUNTRY_ACTIONS.GET_ALL });

  // dispatch({
  //   type: COUNTRY_ACTIONS.GET_ALL_SUCCESS,
  //   payload: TEMP_GET_COUNTRIES_JSON()
  // });

  axios.get(baseUrl, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: COUNTRY_ACTIONS.GET_ALL_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => handleError(err, dispatch));
}