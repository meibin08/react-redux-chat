/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import {CHAT_LOGIN,SET_SESSION,FILTER_SEARCH,CHAT_INIT,SEND_MESSAGE,RECEIVE_MESSAGE,SET_DESTROY,SET_LOGOUT} from "src/constants/Chat";
import Storage from 'src/utils/storage';
let _stores = new Storage(),
	Storage_Key = 'username';
	

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
	                content:"该示例主要使用了react、redux、iscroll、fetch等组件实现模仿实现PC微信聊天，",
	                date: Date.now(),
	                self: 0
	            },{
	                content:"希望能对喜欢react,对于redux还处理迷茫，不知如何入手的小伙伴能起到入门指引",
	                date: Date.now(),
	                self: 0
	            },
	            {
	                content:"如有不足之处，欢迎拍砖指出",
	                date: Date.now(),
	                self: 0
	            },
	            {
	                content:"如果该项目帮助了您，请记得帮我点颗星，就是对我最大的支持",
	                date: Date.now(),
	                self: 0
	            },
	            {
	                content:"项目地址：https://github.com/meibin08/react-redux-chat",
	                date: Date.now(),
	                self: 1
	            },{
	                content:"当然如果您在使用的过程中，有不懂的地方，或更好的建议，我们也可以一起来讨论，欢迎加入React\redux技术交流群一起讨论",
	                date: Date.now(),
	                self: 0
	            },
	            {
	                content:"QQ技术交流群：386485473",
	                date: Date.now(),
	                self: 1
	            }
	        ]
	    }
    ],
	currentChat:{},
	currentUserId:1,
	id_list:[],
	filterKey:""
};
let currentChat={};
let sessions= [];
function chatIndex(state = initStates,action){
	switch(action.type){

		case CHAT_LOGIN:
			let id_list = action.data.sessions.map((item)=>{
				return item.id;
			});
			// console.log("SEARCH_RESULT = 17",initStates);
			action.data.sessions.unshift(initStates.sessions[0]);
			return Object.assign({},state,{...action.data,id_list,currentUserId:1,currentChat:initStates.sessions[0]});

		case CHAT_INIT:
			var _store = JSON.parse(localStorage.getItem("_store")||"{}");
			if(!_stores.get(Storage_Key)){
				// console.log(111)
				localStorage.clear();
				return Object.assign({},state,{...initStates,sessions:[]});
			};
			if(_store && _store.chatIndex){
				let {sessions,currentUserId,user,id_list}=_store.chatIndex;
				// console.log(89,sessions);
				currentChat = (sessions.filter((item)=>item.id==currentUserId)[0]||{});
				// return Object.assign({},state,{sessions,currentUserId,user,id_list,currentChat:currentChat,filterKey:""});
			};
			return Object.assign({},state,(_store.chatIndex||{}),{currentChat:currentChat,filterKey:""});

		//搜索
		case FILTER_SEARCH:
			
			return Object.assign({},state,{
				filterKey:action.data
			});

		case SET_SESSION:
			
			sessions = state.sessions.map((item)=>{
				if(item.id==action.data){
					item.status=false;
					currentChat= item;
				};
				return item;
			});
			return Object.assign({},state,{
				sessions,
				currentChat,
				currentUserId:action.data
			});

		case SEND_MESSAGE: //发送消息
			// console.log("SEND_MESSAGE",action.data);
			
			sessions = state.sessions.map((item)=>{
				if(item.id==state.currentUserId){
					item.messages=item.messages.concat(action.data);
					currentChat= item;
				};
				return item;
			});
			// (sessions.filter((item)=>item.id==state.currentUserId)[0])
			return Object.assign({},state,{
				sessions:sessions,
				currentChat:currentChat
			});
		//接收消息  
		case RECEIVE_MESSAGE: 
			// console.log("SEND_MESSAGE",action.data);
			if(action.data.length <= 0){
				return state;
			};
			for(let key in action.data){
				console.log(action.data[key])
				let {id} = action.data[key];
				sessions = state.sessions.map((item)=>{

					if(item.id == id && item.id != state.currentUserId){
						item.status = true;
						item.messages=item.messages.concat(action.data[key].messages);
						
					};
					if(item.id==state.currentUserId){
						currentChat= item;
					};
					return item;
				});
			};
			// (sessions.filter((item)=>item.id==state.currentUserId)[0])
			return Object.assign({},state,{
				sessions:sessions,
				currentChat:currentChat
			});
		//	送客
		case SET_DESTROY: 
			let _sessions = state.sessions.filter((item)=>item.id !== state.currentUserId);
			// (sessions.filter((item)=>item.id==state.currentUserId)[0])
			return Object.assign({},state,{
				sessions:_sessions,
				currentChat:_sessions[0],
				currentUserId:_sessions[0].id
			});
		//退出
		case SET_LOGOUT:
			localStorage.clear();
			return Object.assign({},state,{currentChat:1,user:{},sessions:[],filterKey:""});
		default:
			return state;
	};
};

export default chatIndex;


