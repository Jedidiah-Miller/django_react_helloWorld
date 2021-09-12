import { ERROR_ACTIONS } from '../actions/types';


const initialState = {
  msg: {},
  status: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case ERROR_ACTIONS.GET:
      return {
        msg: action.payload.msg,
        status: action.payload.status
      };
    default:
      return state;
  }
}