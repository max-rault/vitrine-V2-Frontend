import type from '../actions/types'

const initialState = {
    newUpdate: false,
};

export const serviceWorkerReducer = (state = initialState, action) =>{
  switch (action.type) {
    case type.SET_NEW_UPDATE:
      return {
        ...state,
        newUpdate: action.payload
      }
     default:
      return state
  }
};