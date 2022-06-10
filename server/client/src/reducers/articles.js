import { ARTICLE_ACTIONS } from "../actions/types";


const initialState = {
  articles: [],
  isLoadingArticles: false,
};


export default function(state = initialState, action) {
  switch(action.type) {
    case ARTICLE_ACTIONS.GET_ALL:
      return {
        ...state,
        // articles: action.payload.entries,
        isLoadingArticles: true
      }
    case ARTICLE_ACTIONS.GET_ALL_SUCCESS:
      return {
        ...state,
        articles: action.payload.entries,
        isLoadingArticles: false
      }
    default:
      return state;
  }
}