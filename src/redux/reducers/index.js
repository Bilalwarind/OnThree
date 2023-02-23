import {combineReducers} from 'redux';

//Import All Reducers
import {authReducer} from './auth';
import {homeReducer} from './home';

export default combineReducers({
  auth: authReducer,
  home: homeReducer,
});
