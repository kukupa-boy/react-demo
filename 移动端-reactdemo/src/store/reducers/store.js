import _ from "@/assets/utils.js"
import * as types from '../action-types.js'
// 用于存放收藏列表
const initialState = {
    list: null
}
export default function storeReducer(state = initialState, action) {
    state = _.clone(state)
    switch (action.type) {
        case types.STORE_LIST:
            state.list = action.list;
            break;
        case types.STORE_REMOVE:
            state.list = Array.isArray(state.list) ? state.list.filter(item => item.news.id !== action.id) : state.list;
            break;
        default:
    }
    return state
}