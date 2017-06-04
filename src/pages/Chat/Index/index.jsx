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
import Login from "../Login";
import {fetchJson} from "src/utils/fetch";
import Storage from 'src/utils/storage';

import './Index.scss';

let _store = new Storage(),
	Storage_Key = 'username';
	
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
		

	}
	
	render(){
		let {_sessions,_user}=this.props;
		return ( 
			<div>
				{_sessions.length>0&&Object.keys(_user).length>0?(
				<section className="wechat">
					<Sidebar/>
					<Messages/>
				</section>
				):(
				<Login />
				)
				}
				
			</div>
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

