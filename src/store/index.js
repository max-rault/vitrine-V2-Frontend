import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";
import rootReducer from './reducers/index';

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;