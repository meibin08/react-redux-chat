
//combinReducers用于合并各模块的reducers;
import {combineReducers} from "redux"; 
import chatIndex from "./Chat";

export default combineReducers({
	chatIndex,
});
