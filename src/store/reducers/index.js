import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { usersReducer } from './users';
import { messagesReducer } from './messages';
import { ressourcesReducer } from './ressources';
import { modalsReducer } from './modal';
import { feedbacksReducer } from './feedbacks';
import { serviceWorkerReducer } from './serviceWorker';
import { settingsReducer } from './settings';
import { statsReducer } from './stats';

export default combineReducers({
    auth: authReducer,
    users: usersReducer,
    messages: messagesReducer,
    ressources: ressourcesReducer,
    feedbacks: feedbacksReducer,
    modal: modalsReducer,
    sw: serviceWorkerReducer,
    settings: settingsReducer,
    stats: statsReducer
});