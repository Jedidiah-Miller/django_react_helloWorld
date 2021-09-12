import axios from 'axios';
import { returnErrors } from './messages';
import { USER_ACTIONS } from './types';


export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_ACTIONS.LOADING });

  axios.get('api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_ACTIONS.LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: USER_ACTIONS.AUTH_ERROR
      });
    });
};


export const login = (user) => (dispatch) => {

  const { username, password } = user;
  // request body
  const body = JSON.stringify({ username, password });
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios.post('api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: USER_ACTIONS.LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: USER_ACTIONS.LOGIN_FAIL
      });
    });
};


export const registerUser = (user) => (dispatch) => {

  const {username, email, password, confirmPassword} = user;
  // request body
  const body = JSON.stringify({username, email, password, confirmPassword});
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios.post('api/auth/register', body, config)
    .then(res => {
      dispatch({
        type: USER_ACTIONS.REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: USER_ACTIONS.REGISTER_FAIL
      });
    });
};


//  LOGOUT USER
export const logout = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_ACTIONS.LOADING });

  axios.post('api/auth/logout', null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_ACTIONS.LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      // dispatch({
      //   type: USER_ACTIONS. log out error
      // });
    });
};


export const tokenConfig = (getState) => {
  // token
  const token = getState().auth.token;
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  // if token add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};