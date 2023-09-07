import _ from "@/assets/utils.js"
import * as types from '../action-types.js'
// 用于存储登陆的信息
const initialState = {
    info: null
}
export default function baseReducer(state = initialState, action) {
    state = _.clone(state)
    switch (action.type) {
        case types.BASE_INFO:
            console.log(action.info)
            state.info = action.info // 存储登陆信息
            break;
        default:
    }
    return state
}