import { NEWS_SOURCE_ACTIONS } from '../actions/types.js';


const initialState = {
  newsSources: []
};


export default function(state = initialState, action) {
  switch(action.type) {
    case NEWS_SOURCE_ACTIONS.CREATE:
      return {
        ...state,
      }
    case NEWS_SOURCE_ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
      }
    case NEWS_SOURCE_ACTIONS.GET_ALL:
      return {
        ...state,
        newsSources: action.payload
      }
    default:
      return state;
  }
}