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




class List extends Component{
	constructor(props){
		super(props);

    	this.state = {
    	};
	}
	componentDidMount(){

	}
	
	render(){
		return ( 
			<div className="list-wrap">
				<div className="list">
					<Scroll allowScroll={false}>
					    <ul>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测试</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测试2</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测试</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测试44</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测试77</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测试</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">44测试</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测34试</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测18试</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测试</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">测试</p>
					            <i className="dot" ></i>
					        </li>
					        <li >
					            <p className="avatar">
					                <img   width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
					            </p>
					            <p className="name">111测试</p>
					            <i className="dot" ></i>
					        </li>
					    </ul>
					</Scroll>
				</div>
			    <p className="logout"><button>退出登录</button></p>
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
export default connect(mapStateToProps,mapDispatchToProps)(List);

