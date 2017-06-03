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

import List from '../List';

import './Index.scss';




class Sidebar extends Component{
	constructor(props){
		super(props);

    	this.state = {
    		
    		
    	};
	}
	componentDidMount(){
		//dia(this);

	}
	search(e){
		let {value}=e.target;
		let {ACTIONS} = this.props;
		ACTIONS.filter_search(value);
	}
	render(){
		let {_user} = this.props;
		return ( 
			<section className="sidebar">
				<div className="card">
				    <header className="user">
				        <img className="avatar" width="40" height="40"  src={(_user.img||require("./images/Bin.jpg"))}/>
				        <p className="name">{_user.name}</p>
				    </header>
				    <footer>
				        <input className="search" type="text" onChange={(e)=>this.search(e)} placeholder="search user..." />
				    </footer>
				</div>
				<List/>
			</section>
		);
	}
};

let mapStateToProps=(state)=>{
	let {user,filterKey} = state.chatIndex;
	return {
		_user:user,
		_filterKey:filterKey
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);

