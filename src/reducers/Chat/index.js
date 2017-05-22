/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import {SEARCH_RESULT} from "src/constants/Chat";

let initStates = {
	searchResult:[],
};
function mapIndex(state = initStates,action){
	switch(action.type){

		case SEARCH_RESULT:
			//console.log("SEARCH_RESULT = 17",action.data);
			return Object.assign({},state,{
				searchResult:action.data
			});
		default:
			return state;
	};
};


export default mapIndex;


