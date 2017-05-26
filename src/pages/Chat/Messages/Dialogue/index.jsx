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
import Scroll from 'src/components/common/Scroll'
// import dia from 'src/utils/dia';

import './Index.scss';




class Messages extends Component{
	constructor(props){
		super(props);

    	this.state = {
    		
    	};
	}
	componentDidMount(){
		//dia(this);

	}
	
	render(){
		let {_user,_currentChat} = this.props;
		console.log(_currentChat)
		return ( 
			
			<section className="message-w">
				<header className="group-name">
					<h3>{_currentChat.user.name}</h3>
				</header>
			    <div className="message" >
			    	<Scroll allowScroll={false} scrollbar="custom">
				        <ul >
				            <li className="first" ><span className="history">查看更多历史消息</span></li>
				            {
			            	_currentChat.messages.map((item,i)=>{
			            		return (
			            			<li key={i}>
						                <p className="time">
						                    <span>2017-05-22</span>
						                </p>
						                <div className={classnames("main",{"self":item.self})}>
						                    <img className="avatar" width="30" height="30"src={item.self ? require('./images/Bin.jpg'):_currentChat.user.img}/>
						                    <div className="text" >{item.content}</div>
						                </div>
						            </li>
			            		);
			            	})
					        }
				        </ul>
				    </Scroll>
			    </div>
			    <div className="dialog">
			        <p className="mask"></p>
			        <div className="dia-cont">
			            <div className="clearfix">
			                <p className="avatar"><img src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg" alt=""/></p>
			                <p className="nickname fl">测试的</p>
			            </div>
			            <p className="remark">
			                <label htmlFor=""> 备注  </label>
			                <input className="input" maxLength="10"  placeholder="点击添加备注" type="text" />
			            </p>
			        </div>
			    </div>
			</section>
		);
	}
};

let mapStateToProps=(state)=>{
	let {sessions,user,currentChat} = state.chatIndex;
	return {
		_sessions:sessions,
		_currentChat:currentChat,
		_user:user
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(Messages);

