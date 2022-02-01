import types from "../actions/types";

export const setNewUpdate = (value) => async dispatch => {
  
  try {
    localStorage.removeItem('reduxPersist:sw')
    dispatch({
      type: types.SET_NEW_UPDATE,
      payload: value
    })
  } catch (error) {
    console.log(error)
  }
}