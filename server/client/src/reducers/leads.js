import { EVENT_ACTIONS } from '../actions/types.js';


const initialState = {
  events: []
};


export default function(state = initialState, action) {
  switch(action.type) {
    case EVENT_ACTIONS.CREATE:
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    case EVENT_ACTIONS.GET_ALL:
      return {
        ...state,
        events: action.payload
      }
    case EVENT_ACTIONS.DELETE:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload)
      }
    default:
      return state;
  }
}