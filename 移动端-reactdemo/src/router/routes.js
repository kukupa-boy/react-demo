
import { lazy } from "react"
import {withKeepAlive} from "keepalive-react-component"
import Home from "../views/Home"
const routes = [
    {
        path:"/",
        name:"Home",
        component: withKeepAlive(Home,{cacheId:"Home",scroll:true}),//scroll滚动的位置缓存，cacheId缓存的id
        meta:{
            title:"日报首页"
        }
    },
    {
        path:"/Detail/:id",
        name:"Detail",
        component:  lazy(()=>import("../views/Detail")),
        meta:{
            title:"日报详情"
        }
    },
    {
        path:"/Login",
        name:"Login",
        component: lazy(()=>import("../views/Login")),
        meta:{
            title:"日报登录"
        }
    },
    {
        path:"/Personal",
        name:"Personal",
        component: lazy(()=>import("../views/Personal")),
        meta:{
            title:"个人中心"
        }
    },
    {
        path:"/Store",
        name:"Store",
        component:  lazy(()=>import("../views/Store")),
        meta:{
            title:"我的收藏"
        }
    },
    {
        path:"/Update",
        name:"Update",
        component: lazy(()=>import("../views/Update")),
        meta:{
            title:"修改信息"
        }
    },
    {
        path:"*",
        name:"NotFound",
        component: lazy(()=>import("../views/Page404")),
        meta:{
            title:"404页面"
        }
    },
]
export default routes