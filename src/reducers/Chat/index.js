/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import {CHAT_LOGIN,SET_SESSION,CHAT_INIT} from "src/constants/Chat";

let initStates = {
	user:{
		name:"Bin",
		img:"https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"
	},
	sessions:[
		{
	        id:1,
	        user: {
	            name:"使用帮助",
	            img:"https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"
	        },
	        messages:[
	            {
	                content:"此号为系统消息",
	                date: Date.now(),
	                self: 0
	            },
	            {
	                content:"想买什么保险呢？",
	                date: Date.now(),
	                self: 1
	            }
	        ]
	    }
    ],
	currentChat:{},
	currentUserId:1,
};
function chatIndex(state = initStates,action){
	switch(action.type){

		case CHAT_INIT:
			var _store = JSON.parse(localStorage.getItem("_store")||"{}");
			return Object.assign({},state,(_store.chatIndex||{}));
		case CHAT_LOGIN:
			console.log("SEARCH_RESULT = 17",action.data);
			return Object.assign({},state,action.data);
		case SET_SESSION:
			// console.log("SET_SESSION",a);
			return Object.assign({},state,{
				currentChat:(state.sessions.filter((item)=>item.id==action.data)[0]||{}),
				currentUserId:action.data
			});
		default:
			return state;
	};
};

export default chatIndex;


