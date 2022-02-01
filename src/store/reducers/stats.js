import type from '../actions/types'

const initialState = {
  headerStats: {},
  consumptionStats: {},
  feedbacksStats: {}
};

export const statsReducer = (state = initialState, action) =>{
  switch (action.type) {

    case type.GET_HEADER_STATS:
      return {
        ...state,
        headerStats: action.payload.headerStats,
      }

    case type.GET_CONSUMPTION_STATS: 
      return {
        ...state,
        consumptionStats: action.payload.consumptionStats
      }
    
    case type.GET_FEEDBACKS_STATS:
      return {
        ...state,
        feedbacksStats: action.payload.feedbacksStats
      }
     default:
      return state
  }
};