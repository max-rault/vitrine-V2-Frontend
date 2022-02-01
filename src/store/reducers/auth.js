import type from '../actions/types'

const initialState = {
  user: {},
  userSession: {},
  authSuccess: false,
  user_IsAuth: false,
};

export const authReducer = (state = initialState, action) =>{
  switch (action.type) {
    case type.AUTH_LOGIN:
      return {
        ...state,
        user: action.payload.user,
        userSession: action.payload.session,
        authSuccess: action.payload.authSuccess
      }
    case type.AUTH_IS_AUTH:
      return {
        ...state,
        user_IsAuth: action.payload
      }
    case type.AUTH_LOGOUT:
      return {
        ...state,
        user_IsAuth: action.payload,
        users: {}
      }
     default:
      return state
  }
};