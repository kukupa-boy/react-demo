import {Mask,SpinLoading} from "antd-mobile"
import "./index.less"
function Loading(){
    return <div className="com_loading_box">
        <Mask visible={true} opacity={0.3} color='white' className="mask" >
            <SpinLoading style={{ '--size': '34px'}} />
            <div className="loadingText">loading....</div>
        </Mask>
    </div>
}
export default Loading