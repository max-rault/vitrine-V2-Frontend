import types from "./types"
import API from "../../utils/API";

export const getUser = (id) => async dispatch => {
  try {
    let res = await API.post('/Users/getUser',{id})
    dispatch({
      type: types.GET_USER,
      payload: res.data
    })
  } catch (error) {
     console.log(error)
     dispatch({
        type: types.GET_USER,
        payload: {
          noData: true,
          load: false,
        }
      })
      if(error.response === undefined){
        dispatch({
          type: types.SHOW_MESSAGES,
          payload: {
            message: 'connexion au serveur refusée',
            type:'error',
            desc: "contactez le service informatique",
          }
        })
      } else {
      
        dispatch({
          type: types.SHOW_MESSAGES,
          payload: error.response.data.message
        })
      }
  }
}

export const updateFirstUse = (id) => async dispatch =>{
  try {
    const res = await API.post('/Users/updateFirstUse',{id})
    dispatch({
      type: types.SHOW_MESSAGES_MODAL,
      payload: res.data.message
    })
    
  } catch (error) {
      console.log(error)
      if(error.response === undefined){
        dispatch({
          type: types.SHOW_MESSAGES_MODAL,
          payload: {
            message: 'connexion au serveur refusée',
            type:'error',
            desc: "contactez le service informatique",
          }
        })
      } else {
      
        dispatch({
          type: types.SHOW_MESSAGES_MODAL,
          payload: error.response.data.message
        })
      }
  }
}

export const updateUser = (data) => async dispatch => {
  try {
    const res = await API.post('/Users/updateUser',{data})
    dispatch({
      type: types.UPDATE_USER,
      payload: res.data.user
    })
    dispatch({
      type: types.SHOW_MESSAGES_MODAL,
      payload: res.data.message
    })
  } catch (error) {
    console.log(error)
      if(error.response === undefined){
        dispatch({
          type: types.SHOW_MESSAGES_MODAL,
          payload: {
            message: 'connexion au serveur refusée',
            type:'error',
            desc: "contactez le service informatique",
          }
        })
      } else {
      
        dispatch({
          type: types.SHOW_MESSAGES_MODAL,
          payload: error.response.data.message
        })
      }
  }
}