/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import {ajaxJson} from "src/utils/ajax";
import {CHAT_LOGIN,SET_SESSION,CHAT_INIT} from "src/constants/Chat";

let chat =  {
	chat_init:(data)=>{
		return {
			type:CHAT_INIT,
			data
		}
	},
	chatLogin:(options)=>{

		return (dispatch)=>{
			ajaxJson({
				type:"POST",
				url:"/initSession?username=xiaoqiang&password=123",
				success:(req)=>{
					console.log(req)
					if(req.res == 10000){
						let {data}= req;
						dispatch({
							type:CHAT_LOGIN,
							data
						});
					}else{
						
					};
				},error:()=>{

				}
			});
		};
	},
	set_session:(data)=>{
		return {
			type:SET_SESSION,
			data
		}
	}
};
export default chat;


