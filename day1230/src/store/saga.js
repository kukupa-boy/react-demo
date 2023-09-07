/**
 * 创建监听器函数的方法
 *      take, takeLatest, throttle, debounce,
 * 获取数据的方法：
 *      call, apply, fork, delay
 * 通知reducer的执行
 *     put
 */

import {
    take, takeLatest, throttle, debounce,takeEvery,
    call, apply, fork, delay, put, select, all, cancel
} from 'redux-saga/effects'; // 引入effects
import * as TYPES from './action-types';

/* 工作区域 */
const workingCount = function* workingCount(action) {
    yield delay(2000);
    yield put({
        type: TYPES.DEMO_COUNT,
        payload: action.payload
    });
};
const workingSupport = function* workingSupport() {
    yield delay(1000);
    yield put({
        type: TYPES.VOTE_SUP
    });
};
const workingOppose = function* workingOppose() {
    yield delay(1000);
    yield put({
        type: TYPES.VOTE_OPP
    });
};

/* 创建监听器，监听派发的异步任务 */
const saga = function* saga() {
    /*

     // 假如type值在reducer和这里的take中的type值一样，用户执行派发，会执行一次reducer，如何再通知saga执行一次reducer，使用saga中的监听函数的type值不能和reducer中一致
        yield take(TYPES.DEMO_COUNT)  
        yield put({
            type: TYPES.DEMO_COUNT,
            payload: 3
        })
    */
    
        /*
            只会监听一次
            yield take(`${TYPES.DEMO_COUNT}@SAGA@`);
            yield workingCount();
        */

            // yield takeEvery(`${TYPES.DEMO_COUNT}@SAGA@`, workingCount)
//   while (true) {
//         let action = yield take(`${TYPES.DEMO_COUNT}@SAGA@`);
//         yield fork(workingCount, action);
//         yield fork(workingSupport, action);
//         yield fork(workingOppose, action);
//     } 
    yield takeLatest(`${TYPES.DEMO_COUNT}@SAGA@`, workingCount);
    yield takeLatest(`${TYPES.VOTE_SUP}@SAGA@`, workingSupport);
    yield takeLatest(`${TYPES.VOTE_OPP}@SAGA@`, workingOppose);
};
export default saga;