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
import Dialogue from "../Dialogue";
import Send from "../Send";
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
		let {_sessions,_currentChat,_currentId} = this.props;

		if(!Object.keys(_currentChat).length || _currentChat.id != _currentId){
			return (
				<div className="dialogue-tips">请选择要对话的用户</div>
			);
		};
		return ( 
			<div className="chat-main">
				<Dialogue />
				<Send />
			</div>
		);
	}
};

let mapStateToProps=(state)=>{
	let {sessions,user,currentChat,currentUserId} = state.chatIndex;
	return {
		_sessions:sessions,
		_user:user,
		_currentId:currentUserId,
		_currentChat:currentChat
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(Messages);

