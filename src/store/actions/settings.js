import API from "../../utils/API";
import types from "../actions/types";

export const updateAdSettings = (data) => async dispatch => {
  
  try {
    const res = await API.post('/settings/update_ad_settings', {data})
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

export const getAppSettings = () => async dispatch => {
  
  try {
    const res = await API.post('/settings/get_settings')
    console.log('res data : ', res.data)
    dispatch({
      type: types.GET_SETTINGS,
      payload: {
        appSettings: res.data.appSettings,
        appTasks: res.data.tasksSettings,
        adSettings: res.data.adSettings
      },
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

export const updateAppSettings = (data) => async dispatch => {
  
  try {
    const res = await API.post('/settings/update_app_settings', {data})
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