import type from '../actions/types'

const initialState = {
  list: [],
  count: 0,
  average: 0,
  noFeedBack: false,
};

export const feedbacksReducer = (state = initialState, action) =>{

  switch (action.type) {
    case type.DISPLAY_FEEDBACKS:
      if(action.payload.noFeedBack === true){

        return {
          ...state,
          noFeedBack: action.payload.noFeedBack,
          count: 0,
          average: 0
        }

      } else {
      
        return {
          ...state,
          list: action.payload.list,
          count: action.payload.count,
          average: action.payload.average,
          noFeedBack: action.payload.noFeedBack
        }

      }
   case type.POST_FEEDBACK:
      return {
        ...state,
        list: action.payload.list,
        count: action.payload.count,
        average: action.payload.average,
      }

   case type.UPDATE_FEEDBACK:
      return {
        ...state,
        list: action.payload.list,
        count: action.payload.count,
        average: action.payload.average,
      }
     default:
      return state
  }
};