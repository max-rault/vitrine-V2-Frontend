import API from "../../utils/API";
import types from "../actions/types";

export const getHeaderStats = () => async dispatch => {
  
  try {
    const res = await API.post('/stats/get_header_stats')
    dispatch({
      type: types.GET_HEADER_STATS,
      payload: {
        headerStats: res.data.headerStats,
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

export const new_ressource_stat = (id) => async dispatch => {
  
  try {
    await API.post('/stats/new_ressource_stat',{id})
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

export const getConsumptionStats = () => async dispatch => {
  
  try {
    const res = await API.post('/stats/get_consumption_stats')
    dispatch({
      type: types.GET_CONSUMPTION_STATS,
      payload: {
        consumptionStats: res.data.consumptionStats,
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

export const getFeedBacksStats = () => async dispatch => {
  
  try {
    const res = await API.post('/stats/get_feedbacks_stats')
    console.log('data : ', res.data)
    dispatch({
      type: types.GET_FEEDBACKS_STATS,
      payload: {
        feedbacksStats: res.data.feedbacksStats,
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


