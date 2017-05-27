/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import {CHAT_LOGIN,SET_SESSION,CHAT_INIT,SEND_MESSAGE} from "src/constants/Chat";

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
	                content:"想买什==？",
	                date: Date.now(),
	                self: 1
	            },
	            {
	                content:"此=统消息",
	                date: Date.now(),
	                self: 0
	            },
	            {
	                content:"想=险呢？",
	                date: Date.now(),
	                self: 1
	            },{
	                content:"此号为系统消息",
	                date: Date.now(),
	                self: 0
	            },
	            {
	                content:"想买什么保险呢？????",
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
			return Object.assign({},state,{...action.data});
		case SET_SESSION:
			// console.log("SET_SESSION",a);
			return Object.assign({},state,{
				currentChat:(state.sessions.filter((item)=>item.id==action.data)[0]||{}),
				currentUserId:action.data
			});

		case SEND_MESSAGE: //发送消息
			console.log("SEND_MESSAGE",action.data);
			let currentChat={};
			let sessions = state.sessions.map((item)=>{
				if(item.id==state.currentUserId){
					item.messages.push({
						content:action.data,
		                date: Date.now(),
		                self: 1
					});
					currentChat= item;
				};
				return item;
			});
			// (sessions.filter((item)=>item.id==state.currentUserId)[0])
			return Object.assign({},state,{
				sessions:sessions,
				currentChat:currentChat
			});

		default:
			return state;
	};
};

export default chatIndex;


