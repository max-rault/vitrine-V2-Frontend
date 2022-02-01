import type from '../actions/types'

const initialState = {
  list: [],
  listType: [],

  count: 0,
  noData: false,
  size: {},

  ressource: {},

  ressource_exist: true,

  fileDownloaded: {},
  percentCompleted: 0,
  speed: 0,

  page: 1,

  Imagesstatus: "",

  fileStatus: "",
  percent_file: 0,

  docStatus: "",
  percent_doc: 0,

  ressource_status: ""
};

export const ressourcesReducer = (state = initialState, action) =>{
  switch (action.type) {
    case type.CREATE_RESSOURCE: 
      return{
        ...state,
        ressource_status: action.payload.status
      }
    case type.RESSOURCE_EXIST: 
      return {
        ...state,
        ressource_exist: action.payload.ressource_exist
      }
    case type.GET_RESSOURCES:
      return {
        ...state,
        list: action.payload.list,
        count: action.payload.count,
        noData: action.payload.noData,
        size: action.payload.size
      }

    case type.DOWNLOAD_FILE:
      return {
        ...state,
        fileDownloaded: action.payload.fileDownloaded
      }

    case type.PERCENT_COMPLETED:
      return {
        ...state,
        percentCompleted: action.payload.percent,
        speed: action.payload.speed
      }

    case type.UPLOAD_IMAGES:
      return {
        ...state,
        Imagesstatus: action.payload.logoStatus
      }
    case type.UPLOAD_FILE:
      return {
        ...state,
        fileStatus: action.payload.fileStatus
      }

    case type.PERCENT_FILE_COMPLETED:
      return {
        ...state,
        percent_file: action.payload.percent_file,
      }

    case type.UPLOAD_DOC:
      return {
        ...state,
        docStatus: action.payload.docStatus
      }

    case type.PERCENT_DOC_COMPLETED:
      return {
        ...state,
        percent_doc: action.payload.percent_doc,
      }

    case type.RESET_UPLOAD_STATS:
      return {
        ...state,
          logoStatus: " ",

          fileStatus: " ",
          percent_file: 0,

          docStatus: " ",
          percent_doc: 0
      }

    case type.RESET_DOWNLOAD_STATS:
      return {
        ...state,
        fileDownloaded: {},
        percentCompleted: 0,
        speed: 0,
      }


    case type.GET_RESSOURCES_WITH_TYPE:
      return {
        ...state,
        listType: action.payload.listType,
        count: action.payload.count,
        noData: action.payload.noData
      }

    case type.GET_RESSOURCE:
      return {
        ...state,
        ressource: action.payload.ressource,
      }

    case type.DELETE_RESSOURCES:
      return {
        ...state,
        list: action.payload.ressources,
        count: action.payload.count,
        page: action.payload.currentPage
      }
     default:
      return state
  }
};