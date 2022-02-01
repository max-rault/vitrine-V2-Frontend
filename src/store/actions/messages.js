import types from "./types"

export const hideMessage = () => async dispatch => {
  try {
    dispatch({
      type: types.HIDE_MESSAGES,
    })
  } catch (error) {
    console.log(error)
  }
}

export const hideMessageModal = () => async dispatch => {
  try {
    dispatch({
      type: types.HIDE_MESSAGES_MODAL,
    })
  } catch (error) {
    console.log(error)
  }
}

export const displayNetError = (value) => async dispatch => {

  try {
    dispatch({
      type: types.DISPLAY_NET_ERROR,
      payload: {
        display: value
      }
    })
  } catch (error) {
    console.log(error)
  }

}

export const NetError = () => async dispatch => {

  try {
    // dispatch({
    //   type: types.NET_ERROR
    // })
  } catch (error) {
    console.log(error)
  }

}
