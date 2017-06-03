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
import Storage from 'src/utils/storage';

import './Index.scss';

let _store = new Storage(),
	Storage_Key = 'username';
	

class Login extends Component{
	constructor(props){
		super(props);
		this.flag = false;
    	this.state = {
    		name: '',
            password: '',
            error:"请随意输入，账号、密码 格式均为英文+数字"
    	};
	}
	componentDidMount(){
		localStorage.clear();
	}
	set(e){
		let {name,value}=e.target;
		this.setState({
			[`${name}`]:value
		});
	}
	submit(){
		let {ACTIONS} = this.props;
		let {name,password}=this.state;
        var name_reg = /^([a-zA-Z0-9]+)$/;
        var pwd_reg = /^([a-zA-Z0-9]){3,15}$/;
        if(!name.trim() || !name_reg.test(name.trim())){
            this.setState({error:"请输入正确的账号"});
            return false;
        }else if(!password.trim()){
        	this.setState({error:"请输入您的密码"});
            return false;
        }else if(!pwd_reg.test(password.trim())){
        	this.setState({error:"密码格式有误，请重新输入"});
            return false;
        }else{
        	this.setState({error:"正在登录中……"});
        	if(this.flag){
        		return false;
        	};
        	this.flag = true;
        	ACTIONS.chatLogin({
        		data:{username:name,password:password},
        		success:(req)=>{
        			if(req.res == 10000){
        				_store.set(Storage_Key,name,120);
        			};
        			this.flag = false;
        		},error:()=>{
        			this.flag = false;
        		}
        	});
        };
    }
    keyUp(e){

        if(e.keyCode === 13){
            this.submit();
        }
    }
	render(){
		let {error} = this.state;
		return ( 
			<div className="login-form">
			    <h1>微信客服</h1>
			    <p className="row account"><input className="lg-inp" maxLength="11" onChange={(e)=>this.set(e)} name="name"  type="text" placeholder="账号"/></p>
			    <p className="row pwd"><input className="lg-inp" type="password" onChange={(e)=>this.set(e)} onKeyUp={(e)=>this.keyUp(e)} name="password"  placeholder="密码" /></p>
			    <p className="row-error" id="error" style={{color:"red"}}>{error}</p>
			    <div className="login-btn">
			        <a href="javascript:void(0)" id="submit" onClick={()=>this.submit()} >确 定</a>
			    </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Login);

