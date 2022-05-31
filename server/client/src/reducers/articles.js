import { ARTICLE_ACTIONS } from "../actions/types";


const initialState = {
  articles: []
};


export default function(state = initialState, action) {
  switch(action.type) {
    case ARTICLE_ACTIONS.GET_ALL:
      return {
        ...state,
        articles: action.payload.entries
      }
    default:
      return state;
  }
}