import { combineReducers } from "redux";

//Import All Reducers
import { authReducer } from "./auth";
import { homeReducer } from "./home";
import { profileReducer } from "./profile";

export default combineReducers({
  auth: authReducer,
  home: homeReducer,
  profile: profileReducer,
});
