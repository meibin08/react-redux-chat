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
import Sidebar from "../Sidebar/Index";
import Messages from "../Messages/Index";
import {fetchJson} from "src/utils/fetch";
// import dia from 'src/utils/dia';

import './Index.scss';

class wechat extends Component{
	constructor(props){
		super(props);

    	this.state = {
    		
    		
    	};
	}
	componentDidMount(){
		//dia(this);
		let {ACTIONS} = this.props;
		ACTIONS.chat_init();
		// ACTIONS.chatLogin();
		

	}
	
	render(){
		return ( 
			<section className="wechat">
				<Sidebar/>
				<Messages/>
			</section>
		);
	}
};

let mapStateToProps=(state)=>{
	let {sessions,user} = state.chatIndex;
	return {
		_sessions:sessions,
		_user:user
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(wechat);

