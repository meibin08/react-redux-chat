/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import {CHAT_LOGIN} from "src/constants/Chat";

let initStates = {
	currentUserId:1,
	user:{},
	sessions:[],
};
function chatIndex(state = initStates,action){
	switch(action.type){

		case CHAT_LOGIN:
			console.log("SEARCH_RESULT = 17",action.data);
			return Object.assign({},state,action.data);
		default:
			return state;
	};
};

export default chatIndex;


