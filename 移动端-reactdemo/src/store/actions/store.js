import * as types from '../action-types.js'
import {getCollectList} from "../../api/index.js"
const storeAction = {
    // 获取收藏列表同步redux
    async getStoreListSync(){
        let list = null;
        try{
           let {code,data} = await getCollectList();
           if(+code===0){
                list = data;
           }
        }catch(e){console.log("报错了")}
        return {
            type:types.STORE_LIST,
            list
        }
    },
    // 取消搜藏
    cancelCollectId(id){
        return {
            type:types.STORE_REMOVE,
            id
        }
    },

    // 清空收藏列表
    clearStoreList(){
        return {
            type:types.STORE_LIST,
            list:null
        }
    },

}
export default storeAction;