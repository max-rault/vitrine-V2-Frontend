import types from "./types"

export const hideMaggyFirstUse = () => async dispatch => {
  try {
    dispatch({
      type: types.HIDE_MAGGY_FIRST_USE,
    })
  } catch (error) {
    console.log(error)
  }
}

export const showMaggyFirstUse = () => async dispatch => {
  try {
    dispatch({
      type: types.SHOW_MAGGY_FIRST_USE,
    })
  } catch (error) {
    console.log(error)
  }
}

export const hideDeleteRessources = () => async dispatch =>{

  try {
    dispatch({
      type: types.HIDE_DELETE_RESSOURCES
    })
    
  } catch (error) {
    console.log(error)
  }

}

export const showDeleteRessources = (ItemArray, itemType) => async dispatch =>{

try {
    dispatch({
      type: types.SHOW_DELETE_RESSOURCES,
      payload: {
        ItemArray: ItemArray,
        itemType: itemType
      }
    })
  } catch (error) {
    console.log(error)
  }

}


