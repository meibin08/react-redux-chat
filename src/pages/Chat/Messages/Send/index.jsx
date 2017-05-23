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
		return ( 
			<div className="send">
			    <textarea placeholder="按 Enter 发送, Ctrl + Enter 可换行" ></textarea>
			    <p className="hadler clearfix">
			        <button className="fl" >送客</button>
			        <button className="fr" >发送</button>
			        <span className="tips">不能发送空白信息或特殊字符</span>
			    </p>
			</div>
		);
	}
};

let mapStateToProps=(state)=>{
	const {mapIndex} = state;
	return {};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(Messages);

