import routes from "./routes"
import { Suspense,useEffect, useState } from "react"
import Loading from "@/components/Loading/index.jsx"
import { Route,useLocation,useParams,useSearchParams,useNavigate,Routes ,Navigate} from "react-router-dom"
import store from "../store"
import action from "../store/actions/index"
import {Toast} from "antd-mobile"
// 是否需要动态校验
let isCheckLogin = (path)=>{
    // 登陆动态验证
    let arr = ["/Personal","/Store","/Update"] // 需要校验的组件
    let { base:{info} } = store.getState()
    if(!info && arr.includes(path)) return true
    return false
}
const Element = (props)=>{ // 当路由匹配成功，调用组件（这个组件路由切换的时候不会卸载）
    let { component:Component ,meta, path} = props
    
    let isShow = isCheckLogin(path) // 为true需要校验
    let [_,setRefresh] = useState(null)
    useEffect(()=>{ // 每一次组件更新进来都会执行
           isShow && (async ()=>{
            let infoAcrtion = await action.base.getInfo()
            if(!infoAcrtion.info){ 
                Toast.show({
                    content:"请先登陆",
                    icon: "fail"
                })
                
                navigate({
                    pathname:"/Login",
                    search:`?to=${path}`
                },{
                    replace:true 
                })
            }else{
                store.dispatch(infoAcrtion)
                setRefresh({}) //组件更新
            }
           })()
    })

    // 修改页面的title
    let { title } = meta || {title:"日报"}
    let location = useLocation()
    let params = useParams()
    let [usp] = useSearchParams()
    let navigate = useNavigate()
    document.title = title
    let router = {
        location,
        params,
        usp,
        navigate
    }
    return <>{!isShow?
    <Component meta={meta} router={router} />: 
    <Loading/>}</>
}
function CreateRouter(routes){
    return routes.map((item,index)=>{
        return <Route key={index} path={item.path} element={<Element  {...item}/>}>
              { item.children ? CreateRouter(item.children) : null}
         </Route>
    })
}
export default function RouterView(){
    return <Suspense fallback={<Loading/>}>
                <Routes>
                    {CreateRouter(routes)}
                </Routes>
           </Suspense>
}
/* 创建withRouter */
export const withRouter = function withRouter(Component) {
    // Component:真实要渲染的组件
    return function HOC(props) {
        // 提前获取路由信息，作为属性传递给Component
        const navigate = useNavigate(),
            location = useLocation(),
            params = useParams(),
            [usp] = useSearchParams();
        return <Component {...props} navigate={navigate} location={location} params={params} usp={usp} />;
    };
};