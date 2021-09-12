import { LEAD_ACTIONS } from '../actions/types.js';


const initialState = {
  leads: []
};


export default function(state = initialState, action) {
  switch(action.type) {
    case LEAD_ACTIONS.CREATE:
      return {
        ...state,
        leads: [...state.leads, action.payload]
      }
    case LEAD_ACTIONS.GET_ALL:
      return {
        ...state,
        leads: action.payload
      }
    case LEAD_ACTIONS.DELETE:
      return {
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload)
      }
    default:
      return state;
  }
}