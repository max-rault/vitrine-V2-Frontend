import type from '../actions/types'

const initialState = {
 adSettings: {},
 appSettings: {},
 appTasks: [],
};

export const settingsReducer = (state = initialState, action) =>{
  switch (action.type) {

    case type.GET_SETTINGS:
      return {
        ...state,
        appSettings: action.payload.appSettings,
        appTasks: action.payload.appTasks,
        adSettings: action.payload.adSettings
      }
     default:
      return state
  }
};