/*
 * @authors :Bin Mei
 * @date    :2017-05-02
 * @description：车险项目对接直营 -> 停车场、加油站查询页
 */

import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import actions from "src/actions";
import format from 'src/utils/format';
import { Link,browserHistory } from 'react-router';
import { fetchJson } from 'src/utils/fetch';
import bridge from 'src/utils/bridge';
import {Input, Modal,Tab,Panel,Loading,Button,Cell} from 'dragon-mobile-ui';
import StaticToast from 'src/components/common/Toast';
import iMap from 'src/utils/map';
import dia from 'src/utils/dia';

import './Index.scss';


//查找到的线路结果列表
const SearchLineList =class extends Component{
	render(){
		let {state,SreachFn,_searchResult} = this.props;
		return (
			<div>
			{
			_searchResult&&_searchResult.length>0?(
				<div className="sreach-result"id="mapResult" >
					<div className="arrow">
						<p className={"triangle"+(!state.SearchResultToggle?' shut':'')+""} onClick={SreachFn.ToggleHandler.bind(this,(state.SearchResultActive||0))}></p>
					</div>
					<ul>
					{
					_searchResult.map((item,index)=>{
						return (
							<li 
								className={classnames("r-row",{
									"active":(state.SearchResultActive===index),
									"hide":(state.SearchResultActive!==index&&!state.IsRowHide)
								})}
								key={index+"result"} >
								<section className="conent dbox">
									<p className="sort">{(index+1)}</p>
									<div className="detail flex"onClick={SreachFn.SearchResultHandler.bind(this,index)}>
										<h4>{item.title}</h4>
										<p><span className="adress">{item.address}</span></p>
									</div>
									<p className="route" onClick={SreachFn.RoutePlanning.bind(this,index)}></p>
								</section>
							</li>
						);
					})
					}
					</ul>
				</div>
			):(null)
			}	
			</div>
		);
	}
}

class MapFind extends Component{
	constructor(props){
		super(props);
		this.map = null;
		this.markerArr=[];
		this.driving=null;
		this.ClosePlanningFlag=false;
		this.userPoint={};
    	this.state = {
    		mapId:"MapContent",
    		defaultTab:parseInt(props.location.query.tab||0),
    		result:{},
    		load:true,
    		UserCurrentPoint:{},
			SearchResultActive:"",//选择当前
			IsRowHide:true,
			SearchResultToggle:true,
    		IsRoutePlanningShow:false,//规划的路线是否显示
    	};
	}
	componentDidMount(){
		dia(this);
		this.mapReady();
		// console.log("86行 mapindex zaLoginCookieKey= "+ format.getCookie("zaLoginCookieKey"));
		// console.log("88行 mapindex cookie= "+ format.getCookie("zaMemberLCK"));

	}
	mapReady(){

		let {mapId} = this.state;
		let {ACTIONS,location} = this.props;
		let _Error = (err)=>{
			this.close("load");
		};
		let _this = this;
		iMap.mapInit({
			mapId:mapId,
			success:()=>{
				this.map = new BMap.Map(mapId);
				const point = new BMap.Point(116.331398,39.897445);
				this.map.centerAndZoom(point,15);
				iMap.mapLocation({
					success:(r)=>{
						//success 逻辑处理
						let {query} = location;
						let title = (query&&query.Keyword == 'GasStation'? "附近加油站":"附近停车场");
						bridge.doAction('setTitle', { title: title });
						let myIcon = new BMap.Icon(require("./images/postion-icons.png"), new BMap.Size(18,26));
						myIcon.setImageSize( new BMap.Size(18,26));
						let mk = new BMap.Marker(r.point,{icon:myIcon});
						_this.map.addOverlay(mk);
						_this.map.panTo(r.point);
						// let {query} =  _this.props.location; 
						this.userPoint = r.point;
						iMap.LocalSearch({
							map:_this.map,
							query:query,
							userPoint:r.point,
							success:(res)=>{
								//success 搜索成功后，逻辑处理
								let data =[],options =[],activePoint=new BMap.Point(r.point.lng, r.point.lat);//当前位置的坐标
								options.push(activePoint);
								for(var i=0;i<res.getCurrentNumPois();i++){
									(function(i){
										let itemData = res.getPoi(i);
										// console.log(itemData.uid);
										let item = {};
										let coord = itemData.point;
										let point = new BMap.Point(coord.lng, coord.lat);
										let label = new BMap.Label((i+1),{offset:new BMap.Size(0,-1)});
										label.setStyle({
											top:"-2px",
										    color:"#fff",                   //颜色
											left:"-1px",
										    fontSize:"13px",               //字号
										    fontWeight:"bold",               //字号
										    border:"0",                    //边
										    height:"22px",                //高度
										    width:"18px",                 //宽
										    textAlign:"center",            //文字水平居中显示
										    lineHeight:"22px",            //行高，文字垂直居中显示
										    background:"none",    //背景图片，这是房产标注的关键！
										    cursor:"pointer"
										});
										_this.addMarker(point,label,i);
										item.title=itemData.title;
										item.address=itemData.address;
										item.uid=itemData.uid;
										item.status=true;
										data.push(item);
										options.push(point);
									})(i);
								};
								ACTIONS.searchResult(data);
								_this.setState({load:false});
								//ACTIONS.SearchCompleteData(data);
								_this.map.setViewport(options);//设置所有坐标都在可视范围内
								_this.driving = new BMap.DrivingRoute(_this.map, {renderOptions:{map: _this.map, autoViewport: true, panel: "RoutePlanning"},onSearchComplete:function(results){
									if(_this.ClosePlanningFlag){
										_this.setState({
											IsRoutePlanningShow:true,load:false
										});
									}else{
										_this.setState({
											load:false
										});
									};
								}});
							},
							error:_Error
						});
					},
					error:_Error
				});
			}
		});
	}
	addMarker(point,label,index){ 
		/*
		@ 添加标注到地图，且绑定事件！
		*/
	  var marker = new BMap.Marker(point);
	  this.markerArr.push(marker);
	  this.map.addOverlay(marker);
	  marker.setLabel(label);
	  marker.addEventListener("click", (e)=>{
            this.SearchResultHandler(index);
      });
	}
	CloseRoutePlanning(){
		this.setState({
			IsRoutePlanningShow:false,
			SearchResultToggle:true,
			IsRowHide:true,
		},()=>{
			let ScrollUl = document.querySelector("#mapResult ul");
			let ActiveLi = ScrollUl.children[this.state.SearchResultActive]
			ScrollUl.scrollTop = ActiveLi.offsetTop;
			this.ClosePlanningFlag = false;
		});
	}
	SearchResultHandler(index){
		if(this.state.SearchResultActive === index){
			this.SetToggleStatus(index);
			return false;
		};
		this.setState({load:true});
		this.map.closeInfoWindow();
        let p1 = new BMap.Point(this.userPoint.lng,this.userPoint.lat);//用户所在位置
		let p2 = new BMap.Point(this.markerArr[index].point.lng,this.markerArr[index].point.lat);//当前点击的坐标
		// //map.clearOverlays();
		this.driving.search(p1, p2);
		this.SetToggleStatus(index);
	}
	RoutePlanning(index){
		let {state}=this;
		if(state.SearchResultActive !== index){
			this.ClosePlanningFlag = true;
			this.SearchResultHandler(index);
		}else{
			this.setState({
				IsRoutePlanningShow:true
			},()=>{
				this.setState({load:false});
			});
		};
		
	}
	ToggleHandler(index){
		//展开收起
		let {state}=this;
		if(!state.SearchResultToggle){
			this.setState({
				SearchResultToggle:true,
				IsRowHide:true,
			});
		}else{ //之前没有选择过其他的路线，默认选择0
			this.SearchResultHandler(index);
		};
	}
	//设置展开收起
	SetToggleStatus(index){
		this.setState({
			SearchResultActive:index,
			SearchResultToggle:false,
			IsRowHide:false,
		});
	}
	render(){
		let {mapId,load,IsRoutePlanningShow} = this.state;
		
		return ( 
			<div className="map-find">
				<section id={mapId} className="map-content" style={{height:screen.height+'px'}}></section>
				<div className={"route-planning"+(IsRoutePlanningShow?' show':' hide')+""}>
					<p className="close-planning" onClick={this.CloseRoutePlanning.bind(this)}></p>
					<section id="RoutePlanning"></section>
				</div>
				<SearchLineList 
					state={this.state} {...this.props}
					SreachFn={{
						ToggleHandler:this.ToggleHandler.bind(this),
						SearchResultHandler:this.SearchResultHandler.bind(this),
						RoutePlanning:this.RoutePlanning.bind(this)
					}}/>
				<Loading visible={load}/>
			</div>
		);
	}
};

let mapStateToProps=(state)=>{
	const {mapIndex} = state;
	return {
		_searchResult:mapIndex.searchResult
	};
}; 

let mapDispatchToProps=(dispatch)=>{
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default connect(mapStateToProps,mapDispatchToProps)(MapFind);

