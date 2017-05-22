/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */


import {SEARCH_RESULT} from "src/constants/Chat";

let chat =  {
	searchResult:(data)=>{
	
		return {
			type:SEARCH_RESULT,
			data
		};
	}
};
export default chat;


