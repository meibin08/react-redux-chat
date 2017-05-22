/*
 * @authors :Bin Mei
 * @date    :2017-05-02
 * @description：车险项目对接直营 -> 停车场、加油站查询页
 */


import {SEARCH_RESULT} from "src/constants/Chat";

let map =  {
	searchResult:(data)=>{
	
		return {
			type:SEARCH_RESULT,
			data
		};
	}
};
export default map;


