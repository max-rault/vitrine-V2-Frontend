import API from "../../utils/API";
import types from "../actions/types";
import db from "../../utils/db";

export const authLogin = (username, password) => async dispatch => {
  
  try {
    const res = await API.post('/auth', {username, password})
    dispatch({
      type: types.AUTH_LOGIN,
      payload: {
        user: res.data.user,
        session: res.data.session,
        authSuccess: res.data.success
      },
    })
    dispatch({
      type: types.UPDATE_USER,
      payload: res.data.user
    })
  } catch (error) {
     console.log(error)

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

export const isAuth = () => async dispatch =>{
  dispatch({
    type: types.AUTH_IS_AUTH,
    payload: localStorage.getItem("token") !== null
  })
}

export const logout = () => dispatch =>{
  try {
    localStorage.clear()
    db.close()
    db.delete().then(() => {
        console.log("Database successfully deleted");
    }).catch((err) => {
        console.error("Could not delete database");
    })    
    dispatch({
      type: types.AUTH_LOGOUT,
      payload: false
    })
  } catch (error) {
    console.log('err in logout action ======> ', error)
  }
}