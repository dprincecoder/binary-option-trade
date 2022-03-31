import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

//combine the reducers
export default combineReducers({
	user: userReducer,
});
