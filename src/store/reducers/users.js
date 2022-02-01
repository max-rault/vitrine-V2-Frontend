import type from '../actions/types'
const initialState = {
  user: {},
 
};

export const usersReducer = (state = initialState, action) =>{
 
  switch (action.type) {
    case type.GET_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case type.UPDATE_USER:     
      return {
        ...state,
        user: action.payload
      }
     default:
      return state
  }
};