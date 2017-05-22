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
    let store  = createStoreWithMiddleware(reducers,(__DEBUG__ && window.devToolsExtension ? window.devToolsExtension() : undefined));
    return store;
};

export default configStore();