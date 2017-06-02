/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import {ajaxJson} from "src/utils/ajax";
import {fetchJson} from "src/utils/fetch";
import {CHAT_LOGIN,SET_SESSION,CHAT_INIT,SEND_MESSAGE,SET_DESTROY} from "src/constants/Chat";

let chat =  {
	chat_init:(data)=>{
		return {
			type:CHAT_INIT,
			data
		}
	},
	chatLogin:(options)=>{

		return (dispatch)=>{
			const {data,success,error}=options;
			ajaxJson({
				type:"POST",
				url:"/initSession",
				data:data,
				success:(req)=>{
					console.log(req)
					if(req.res == 10000){
						let {data}= req;
						dispatch({
							type:CHAT_LOGIN,
							data
						});
					}else{
						console.log(req.errorMsg)
					};
					success&&success(req);
				},error:()=>{
					error&&error();
				}
			});
			return ;
			fetchJson({
				type:"POST",
				url:"/initSession",
				data:{username:"xiaoqiang",password:123},
				success:req=>{
					console.log(req)
					if(req.res == 10000){
						dispatch({
							type:CHAT_LOGIN,
							data:req
						});
					}else{

					};
				},
				error:err=>{
					console.log(err);
				}
			});
			
		};
	},
	set_session:(data)=>{
		return {
			type:SET_SESSION,
			data
		}
	},
	send_message:(options)=>{
		return (dispatch)=>{
			const {user,id,content,success,error}=options;
			ajaxJson({
				type:"POST",
				url:"/pushMessage?sid=" + user.sid,
				data:JSON.stringify({
					'sid': user.sid,
                    'id': id,
                    'content':content
				}),
				success:(req)=>{
					if(req.res == 10000){
						let {data}= req;
						dispatch({
							type:SEND_MESSAGE,
							data: content
						});
					}else{
						console.log(req.errorMsg)
					};
					success&&success(req);
				},error:()=>{
					error&&error();
				}
			});
		};
	},
	//送客
	set_destroy:(options)=>{
		
		return (dispatch)=>{
			const {user,id,success,error}=options;
			ajaxJson({
				type:"GET",
				url:"destroySession?sid="+user.sid+'&openid='+id,
				success:(req)=>{
					if(req.res == 10000){
						let {data}= req;
						dispatch({
							type:SET_DESTROY,
							data: content
						});
					}else{
						console.log(req.errorMsg)
					};
					success&&success(req);
				},error:()=>{
					error&&error();
				}
			});
		};
	}
};
export default chat;


