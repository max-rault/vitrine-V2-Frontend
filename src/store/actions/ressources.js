import types from "./types"
import API from "../../utils/API";

export const checkIfExist = (name) => async dispatch =>{

try {
    const res = await API.post('/ressources/checkExist',{name})

    dispatch({
      type: types.RESSOURCE_EXIST,
      payload: {
        ressource_exist: res.data.exist,
      }
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
          payload: {
            message: error.response.data.message,
            type: error.response.data.type,
            desc: error.response.data.desc,
          }
        })
      }
    }
}

export const createRessource = (data) => async dispatch => {

  try {
    const res = await API.post('/ressources/create_ressource',{data})
    dispatch({
      type: types.CREATE_RESSOURCE,
      payload: {
        status: res.data.status
      }
    })
    dispatch({
      type: types.RESET_UPLOAD_STATS
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
        dispatch({
          type: types.RESET_UPLOAD_STATS
        })
      } else {
      
        dispatch({
          type: types.SHOW_MESSAGES,
          payload: {
            message: error.response.data.message,
            type: error.response.data.type,
            desc: error.response.data.desc,
          }
        })
        dispatch({
          type: types.RESET_UPLOAD_STATS
        })
      }
  }
}

export const uploadImages = (data, uid) => async dispatch =>{


  try {
    let image = new FormData()
    image.append('uid', uid)

    if(data.logo.length > 0){

      image.append('logo_name', data.logo[0].name)
      image.append('images', data.logo[0].originFileObj)
    }
    
    if (data.background.length > 0){
      image.append('background_name', data.background[0].name)
      image.append('images', data.background[0].originFileObj)
    }
    const res = await API.post('/upload/upload_Images',image, {
      headers: {"Content-Type": "multipart/form-data"},
      maxContentLength: 10000000000,
      maxBodyLength: 10000000000
    })
    dispatch({
      type: types.UPLOAD_IMAGES,
      payload: {
        logoStatus: res.data.status,
      }
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
        payload: {
          message: error.response.data.message,
          type: error.response.data.type,
          desc: error.response.data.desc,
        }
      })
    }    
  }

}

export const uploadDoc = (data, uid) => async dispatch =>{

  
  try {
    const fileValue = data.doc_associated || data.docs

    let docs = new FormData()

    docs.append('uid', uid)
    docs.append('association', data.is_association)
    docs.append('docs', fileValue[0].originFileObj)
    
    const res = await API.post('/upload/upload_docs',docs, {

      timeout: null,
      onUploadProgress: async (progressEvent) => {
        try {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); 

          dispatch({
            type: types.PERCENT_DOC_COMPLETED,
            payload: {
              percent_doc: percentCompleted,
            }
          })            
        } catch (error) {
          console.log(error)
        }
      },  
      headers: {"Content-Type": "multipart/form-data"},
      maxContentLength: 10000000000,
      maxBodyLength: 10000000000      
    })
    dispatch({
      type: types.UPLOAD_DOC,
      payload: {
        docStatus: res.data.status,
      }
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
        payload: {
          message: error.response.data.message,
          type: error.response.data.type,
          desc: error.response.data.desc,
        }
      })
    }    
  }

}

export const uploadFile = (file, uid) => async dispatch =>{

  try {
    let fileUpload = new FormData()
    fileUpload.append('uid', uid)
    fileUpload.append('file', file)
    
    const res = await API.post('/upload/upload_file',fileUpload, {

      headers: {"Content-Type": "multipart/form-data"},
      onUploadProgress: async (progressEvent) => {
        try {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); 
         
          dispatch({
            type: types.PERCENT_FILE_COMPLETED,
            payload: {
              percent_file: percentCompleted,
            }
          }) 
        } catch (error) {
          console.log(error)
        }
      },  
      maxContentLength: 10000000000,
      maxBodyLength: 10000000000
    })
    dispatch({
      type: types.UPLOAD_FILE,
      payload: {
        fileStatus: res.data.status,
      }
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
        payload: {
          message: error.response.data.message,
          type: error.response.data.type,
          desc: error.response.data.desc,
        }
      })
    }    
  }

}

export const updateRessource = (data) => async dispatch => {

  try {
    const res = await API.post('/ressources/update',{data})
    dispatch({
      type: types.SHOW_MESSAGES,
      payload: {
        message: res.data.message,
        type: res.data.type,
      }
    })
    dispatch({
      type: types.RESET_UPLOAD_STATS
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
      dispatch({
        type: types.RESET_UPLOAD_STATS
      })
      } else {
      
        dispatch({
          type: types.SHOW_MESSAGES,
          payload: {
            message: error.response.data.message,
            type: error.response.data.type,
            desc: error.response.data.desc,
          }
        })
        dispatch({
          type: types.RESET_UPLOAD_STATS
        })
      }
  }
}

export const deleteRessources = (data) => async dispatch =>{

 try {
    const res = await API.post('/ressources/delete', {data})
    dispatch({
      type: types.DELETE_RESSOURCES,
      payload: {
        count: res.data.count,
        currentPage: res.data.currentPage,
        ressources: res.data.ressources        
      }
    })
    dispatch({
      type: types.SHOW_MESSAGES,
      payload: {
        message: res.data.message.message,
        type: res.data.message.type
      }
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

export const getRessource = (id) => async dispatch => {

 try {
    const res = await API.post('/ressources/getRessource',{id})
    await dispatch({
        type: types.GET_RESSOURCE,
        payload: {
          ressource: res.data.ressource,
        }
      })
  
    await dispatch({
        type: types.DISPLAY_FEEDBACKS,
        payload: {
          list: res.data.feedbacks,
          count: res.data.feedbacksCount,
          average: res.data.average,
          noFeedBack: res.data.noFeedback
        }
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
          payload: {
            message: error.response.data.message,
            type: error.response.data.type,
            desc: error.response.data.desc,
          }
        })
      }
  }

}


export const downloadFile = (data) => async dispatch => {

 const id = data.id
 const type = data.type
 try {
    const res = await API.post(

      '/download/get',

      {id, type},

      {
        timeout: null,
        responseType: data.responseType,
        onDownloadProgress: async (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); 
          const time = progressEvent.timeStamp/1000
          const bytes = progressEvent.loaded/1024/1024

          const speed = bytes/time
          await dispatch({
            type: types.PERCENT_COMPLETED,
            payload: {
              percent: percentCompleted,
              speed: speed.toFixed(2)
            }
          })
        },
        headers: {
          Accept: data.headerAccept,
        },
        maxContentLength: 10000000000,
        maxBodyLength: 10000000000
      }
    )
    await dispatch({
        type: types.DOWNLOAD_FILE,
        payload: {
          fileDownloaded: res.data,
        }
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
          payload: {
            message: error.response.data.message,
            type: error.response.data.type,
            desc: error.response.data.desc,
          }
        })
      }
  }

}

export const resetDowloadStats = () => async dispatch => {

  try {
    dispatch({
      type: types.RESET_DOWNLOAD_STATS
    })
  } catch (error) {
        console.log(error)
  }

}

export const getHomeRessources = () => async dispatch =>{

  try {
    let res = await API.post('/ressources/get_home')
    dispatch({
        type: types.GET_HOME_RESSOURCES,
        payload: {
          list: res.data.list,
          count: res.data.count,
          noData: res.data.noData,
          size: res.data.size
        }
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
          payload: {
            message: error.response.data.message,
            type: error.response.data.type,
            desc: error.response.data.desc,
          }
        })
      }
    }
}

export const getRessources = (offset, limit) => async dispatch =>{

 try {
    let res = await API.post('/ressources/get',{offset, limit})
    dispatch({
        type: types.GET_RESSOURCES,
        payload: {
          list: res.data.list,
          count: res.data.count,
          noData: res.data.noData,
          size: res.data.size
        }
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
          payload: {
            message: error.response.data.message,
            type: error.response.data.type,
            desc: error.response.data.desc,
          }
        })
      }
  }
}

export const getRessourcesType = (data) => async dispatch =>{

 try {
    let res = await API.post('/ressources/get_with_type',{data})
    dispatch({
        type: types.GET_RESSOURCES_WITH_TYPE,
        payload: {
          listType: res.data.listType,
          count: res.data.count,
          noData: res.data.noData
        }
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
          payload: {
            message: error.response.data.message,
            type: error.response.data.type,
            desc: error.response.data.desc,
          }
        })
      }
  }

}