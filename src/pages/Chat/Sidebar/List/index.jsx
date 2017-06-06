/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */

import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import actions from "src/actions";
import Scroll from 'src/components/common/Scroll';
import Svg from 'src/components/common/Svg';

// import dia from 'src/utils/dia';

import './Index.scss';




class List extends Component{
	constructor(props){
		super(props);
		this.time = null;
		this.flag = false;
    	this.state = {
    	};
	}
	componentDidMount(){
		this.getMessage();
	}
	componentWillUnmount(){
		clearInterval(this.time);
	}
	Random(num){
		let {_id_list} = this.props;
		let arr = _id_list.concat([]);
		var return_array=[];
	    for (var i = 0; i<arr.length; i++) {
	        //判断如果数组还有可以取出的元素,以防下标越界
	        if(return_array.length < num){

		        if (arr.length>0) {
		            var arrIndex = Math.floor(Math.random()*arr.length);
		            return_array[i] = arr[arrIndex];
		            arr.splice(arrIndex, 1);
		        } else {
		            break;
		        };
	        }else{
	        	break;
	        };
	    }
	    return return_array;
	}
	getMessage(){
		this.time = setInterval(()=>{
			let {ACTIONS,_user} = this.props;
			let id_list = this.Random(3);
			// return ;
			if(id_list.length<=0 || this.flag){
				return false;
			};
			this.flag = true;
			ACTIONS.receive_message({
				id_list:id_list,
				user:_user,
				success:req=>{
					this.flag = false;
				},error:err=>{
					this.flag = false;
				}
			});
		},8000);
		
		// console.log(y)
	}
	render(){
		let {_filterKey,_sessions,_currentId,_currentChat,ACTIONS} = this.props;
		return ( 
			<div className="list-wrap">
				<div className="list">
					<Scroll allowScroll={false} scrollbar="custom">
					    <ul>
					    	{
					    	_sessions.map((item,i)=>{
					    		return (
					    			<li key={"index"+i} className={classnames({
					    				"active":(item.id === _currentId&&_currentId==_currentChat.id),
					    				"hide":(_filterKey != "" && item.user.name.indexOf(_filterKey) < 0)
					    			})} onClick={()=>ACTIONS.set_session(item.id)}>
							            <p className="avatar">
							                <img   width="40" height="40"src={item.user.img||"https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"} />
							            </p>
							            <p className="name">{item.user.name}</p>
							            {item.status?(<i className={classnames("dot")} ></i>):(null)}
							        </li>
					    		);
					    	})
					    	}
					    </ul>
					</Scroll>
				</div>
			    <div className="logout">
			    	<a className="ic" target="_bank" href="https://github.com/meibin08/react-redux-chat">
			    		<Svg />
			    		<p className="msg">如果该示例帮助了你，记得去github上帮我点颗星哦</p>
			    	</a>
			    	<a></a>
			    	<a className="ic qq"  target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=d44baf17512787eb0e4f268849a3239d6b9675145a606e21b9a055176bd1c0e2">
			    		<Svg hash="#svg-qq" />
			    		<p className="msg">您在使用的过程中，有不懂的疑问或者bug可以加QQ群，一起交流哦</p>
			    	</a>
			    	<span className="ic" title="退出" onClick={()=>this.props.ACTIONS.set_logout()}>
			    		<Svg hash="#svg-exit" />
			    	</span>
			    	<button style={{display:"none"}}>退出登录</button>
			    </div>
			</div>
		);
	}
};

let mapStateToProps=(state)=>{
	let {sessions,user,id_list,filterKey,currentChat,currentUserId} = state.chatIndex;
	return {
		_sessions:sessions,
		_user:user,
		_id_list:id_list,
		_filterKey:filterKey,
		_currentChat:currentChat,
		_currentId:currentUserId
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(List);

