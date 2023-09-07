import * as types from '../action-types.js'
import {queryUserInfo} from "../../api/index.js"
const baseAction = {
    // 获取登陆者信息
    async getInfo(){
        let info = null
        try{
            let {code,data} = await queryUserInfo()
            if(+code === 0){
                info = data
            }
        }catch(E){}
        return {
            type:types.BASE_INFO,
            info: info
        }
    },
    // 清除登陆者信息
    clearUserInfo(){
        return {
            type:types.BASE_INFO,
            info: null
        }
    }
}
export default baseAction;