/*
 * @authors :Bin Mei
 * @date    :2017-05-02
 * @description：车险项目对接直营 -> 停车场、加油站查询页
 */

import {SEARCH_RESULT} from "src/constants/Chat";

let initStates = {
	searchResult:[],
};
function mapIndex(state = initStates,action){
	switch(action.type){

		case SEARCH_RESULT:
			//console.log("SEARCH_RESULT = 17",action.data);
			return Object.assign({},state,{
				searchResult:action.data
			});
		default:
			return state;
	};
};


export default mapIndex;


