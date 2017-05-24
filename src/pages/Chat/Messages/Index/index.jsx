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
		return ( 
			
			<section className="message-w">
				<header className="group-name">
					<h3>的撒反倒是</h3>
				</header>
			    <div className="message" >
			    	<Scroll  allowScroll={false} scrollbar="custom">
				        <ul >
				            <li className="first" ><span className="history">查看更多历史消息</span></li>
				            <li >
				                <p className="time">
				                    <span>2017-05-22</span>
				                </p>
				                <div className="main">
				                    <img className="avatar" width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
				                    <div className="text" >1111value卖保险的来了</div>
				                </div>
				            </li>
				            <li >
				                <p className="time">
				                    <span>2017-05-22</span>
				                </p>
				                <div className="main">
				                    <img className="avatar" width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
				                    <div className="text" >fd卖保险的来了</div>
				                </div>
				            </li>
				            <li >
				                <p className="time">
				                    <span>2017-05-22</span>
				                </p>
				                <div className="main">
				                    <img className="avatar" width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
				                    <div className="text" >1ue卖保险的来了</div>
				                </div>
				            </li>
				            <li >
				                <p className="time">
				                    <span>2017-05-22</span>
				                </p>
				                <div className="main">
				                    <img className="avatar" width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
				                    <div className="text" >vfgdgalue卖保险的来了</div>
				                </div>
				            </li>
				             <li >
				                <p className="time">
				                    <span>2017-05-22</span>
				                </p>
				                <div className="main">
				                    <img className="avatar" width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
				                    <div className="text" >1111value卖保险的来了</div>
				                </div>
				            </li>
				            <li >
				                <p className="time">
				                    <span>2017-05-22</span>
				                </p>
				                <div className="main">
				                    <img className="avatar" width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
				                    <div className="text" >fd卖保险的来了</div>
				                </div>
				            </li>
				            <li >
				                <p className="time">
				                    <span>2017-05-22</span>
				                </p>
				                <div className="main">
				                    <img className="avatar" width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
				                    <div className="text" >1ue卖保险的来了</div>
				                </div>
				            </li>
				            <li >
				                <p className="time">
				                    <span>2017-05-22</span>
				                </p>
				                <div className="main">
				                    <img className="avatar" width="30" height="30"src="https://ps.ssl.qhimg.com/t01531c2d8bd3dbe644.jpg"/>
				                    <div className="text" >vfgdgalue卖保险的来了</div>
				                </div>
				            </li>
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
	const {mapIndex} = state;
	return {};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(Messages);

