import { COUNTRY_ACTIONS } from "../actions/types";


const initialState = {
  isLoadingAll: null,
  countries: []
};


export default function(state = initialState, action) {
  switch(action.type) {
    case COUNTRY_ACTIONS.GET_ALL:
      return {
        ...state,
        isLoadingAll: true,
      }
    case COUNTRY_ACTIONS.GET_ALL_SUCCESS:
      return {
        ...state,
        isLoadingAll: false,
        countries: action.payload
      }
    default:
      return state;
  }
}