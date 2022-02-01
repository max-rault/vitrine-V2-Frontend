import type from '../actions/types'

const initialState = {
  message: '',
  type: '',
  desc: '',
  visible: false,
  message_modal: '',
  type_modal: '',
  visible_modal: false,
  networkError: false,
  showNetError: false
};

export const messagesReducer = (state = initialState, action) =>{
 
  switch (action.type) {
    case type.SHOW_MESSAGES:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        desc: action.payload.desc,
        visible: true
      }
    case type.HIDE_MESSAGES:
      return {
        ...state,
        message: ' ',
        type: ' ',
        desc: ' ',
        visible: false
      }
  case type.SHOW_MESSAGES_MODAL:
      return {
        ...state,
        message_modal: action.payload.message,
        type_modal: action.payload.type,
        visible_modal: true
      }
    case type.HIDE_MESSAGES_MODAL:
      return {
        ...state,
        visible_modal: false
      }
    case type.DISPLAY_NET_ERROR:
      return {
        ...state,
        showNetError: action.payload.display
      }
    case type.NET_ERROR:
      return {
        ...state,
        networkError: false
      }
     default:
      return state
  }
};