import API from "../../utils/API";
import types from "../actions/types";

export const postFeedback = (data) => async dispatch => {
  
  try {
    const res = await API.post('/feedback/new', {data})
    dispatch({
      type: types.POST_FEEDBACK,
      payload: {
        list: res.data.feedbacks,
        average: res.data.average,
        count: res.data.count 
      },
    })
    dispatch({
      type: types.SHOW_MESSAGES,
      payload: {
        message: res.data.message,
        type: res.data.type,
      }
    })   
  } catch (error) {
      console.log(error.response)

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
        payload: {
          message: error.response.data.message,
          desc: error.response.data.desc,
          type: error.response.data.type,
        }
      })   
    }
  }
}

export const deleteFeedback = (data) => async dispatch => {
  
  try {
    const res = await API.post('/feedback/delete', {data})
    dispatch({
      type: types.DELETE_FEEDBACK,
      payload: {
        list: res.data.feedbacks,
        average: res.data.average,
        count: res.data.count 
      },
    })
    dispatch({
      type: types.SHOW_MESSAGES,
      payload: {
        message: res.data.message,
        type: res.data.type,
      }
    })   
  } catch (error) {
      console.log(error.response)

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
        payload: {
          message: error.response.data.message,
          desc: error.response.data.desc,
          type: error.response.data.type,
        }
      })   
    }
  }
}

export const updateFeedBack = (data) => async dispatch => {
  
  try {
    const res = await API.post('/feedback/update', {data})
    dispatch({
      type: types.UPDATE_FEEDBACK,
      payload: {
        list: res.data.feedbacks,
        average: res.data.average,
        count: res.data.count 
      },
    })
    dispatch({
      type: types.SHOW_MESSAGES,
      payload: {
        message: res.data.message,
        type: res.data.type,
      }
    })   
  } catch (error) {
      console.log(error.response)

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
        payload: {
          message: error.response.data.message,
          desc: error.response.data.desc,
          type: error.response.data.type,
        }
      })   
    }
  }
}