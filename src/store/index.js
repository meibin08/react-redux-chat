/*
 * @authors :Bin Mei
 * @date    :2017-05-22
 * @description：react-redux-chat  -> 仿微信聊天工具
 */
import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "src/reducers";

function configStore (){
    let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    //dev环境开启redux调试
    let cStore  = createStoreWithMiddleware(reducers,(__DEBUG__ && window.devToolsExtension ? window.devToolsExtension() : undefined));
    return cStore;
};
let Store = configStore();

let currentVal ;
Store.subscribe(() => {
	let prevVal = currentVal;
	currentVal = Store.getState();
	if (prevVal !== currentVal) {
		//console.log(currentVal,'state发生了变化')
		//localStorage.setItem("_store",JSON.stringify(currentVal));
		// console.log('Some deep nested property changed from', prevVal, 'to', currentVal)
	};
})
export default Store;