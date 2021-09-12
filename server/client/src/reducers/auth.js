import { USER_ACTIONS } from '../actions/types';


const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case USER_ACTIONS.LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_ACTIONS.LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case USER_ACTIONS.LOGIN_SUCCESS:
    case USER_ACTIONS.REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case USER_ACTIONS.AUTH_ERROR:
    case USER_ACTIONS.LOGIN_FAIL:
    case USER_ACTIONS.LOGOUT_SUCCESS:
    case USER_ACTIONS.REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      };
    default:
      return state;
  }
}