import {useState} from "react"
import { Button } from "antd-mobile"
// 本组件用于发送请求的按钮处理(二次封装)
function ButtonAgain(props){
    let options = {...props}
    let {children,onClick:handle } = options
    // 拿到children将其中options移除掉,因为options是赋值给属性的，children要赋值到组件里面
    delete options.children
    
    /** 
     * 状态 loading控制元素的loading效果
     */
    let [loading,setLoading] = useState(false)
    const clickHandle = async (e)=>{
        setLoading(true)
        // try包裹的原因是因为如果执行失败，也可以将setLoading变为false,因为await执行失败就不会再往后执行了
        // (如果父元素没有返回一个成功的promise实例，就不会将loading改为false,并且页面也会报错)
        try{ 
            await handle() // 拿到父元素的方法执行
        }catch(e){
            setLoading(false)
         }
    }
    if(handle){ // 可能父组件没有onclick属性（有些form组件是哟你的type=submit提交的，就没有这个，所以要用这个方法最好不要用方式）,如果你去执行就会报错
        // 首先明白一点，父组件传递的属性中包含了onclick=xxx,handle是拿到了xxx的方法 ，options.handle就相当于onClick这个属性名
        // 这里就相当于将父组件传递来的onClick=xxx,改成了onclick=clickHandle
        options.handle = clickHandle
    }
    return <Button {...options} loading={loading}>
        {children}
    </Button>
}
export default ButtonAgain