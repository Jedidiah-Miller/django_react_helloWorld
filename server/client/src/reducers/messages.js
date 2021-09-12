import { MESSAGE_ACTIONS } from '../actions/types';


const initialState = {};


export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_ACTIONS.GET:
      return action.payload;
    case MESSAGE_ACTIONS.CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
}