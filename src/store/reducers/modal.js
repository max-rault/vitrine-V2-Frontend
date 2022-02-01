import type from '../actions/types'

const initialState = {

  maggyFirstUse: false,
  deleteRessources: false,
  itemArray: [],
  itemType: '',
};

export const modalsReducer = (state = initialState, action) =>{
 
  switch (action.type) {
    case type.SHOW_MAGGY_FIRST_USE:
      return {
        ...state,
        maggyFirstUse: true
      }
    case type.HIDE_MAGGY_FIRST_USE:
      return {
        ...state,
        maggyFirstUse: false
      }
    case type.HIDE_DELETE_RESSOURCES:
      return {
        ...state,
        deleteRessources: false
      }
    case type.SHOW_DELETE_RESSOURCES:
      return {
        ...state,
        deleteRessources: true,
        itemArray: action.payload.ItemArray,
        itemType: action.payload.itemType
      }
     default:
      return state
  }
};