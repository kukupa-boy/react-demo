// 合并reducer
import { combineReducers } from 'redux';
import baseReducer from './base';
import storeReducer from './store';

let reducers = combineReducers({
    base:baseReducer,
    store:storeReducer
})
export default reducers;