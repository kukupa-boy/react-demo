// 构建路由表（这套路由表不放入页面中，因为这不方便看dva的使用语法）
import Vote from './routes/Vote';
import dynamic from 'dva/dynamic';
import { Route, Redirect } from 'dva/router';
// 懒加载公共函数
const lazyLoad = (component,models) => {
    if(!models) models = ()=>[];
    return dynamic({
        app: window.app,
        models:models,
        component: component,
    })
}
// personal的子路由
const children = [
    {
        path: "/personal/info",
        component: lazyLoad(()=>('./routes/Personal/Info')),
        meta:{
            title:"个人信息"
        }
    },
    {
        path: "/personal/setting",
        component: lazyLoad(()=>{'./routes/Personal/Setting'}),
        meta:{
            title:"个人设置"
        }
    }
]
// 一级路由
const router = [
    {
        path: "/",
        component: Vote,
        exact: true,
        meta:{
            title:"投票"
        }
    },
    {
        path: "/demo",
        component: lazyLoad(() => import(/*webpackChunkName:"yan"*/"./routes/Demo"),[()=>import('./models/demo')]),
        meta:{
            title:"demo"
        }
    },
    {
        path: "/personal",
        component: lazyLoad(()=>import('./routes/Personal')),
        children: children,
        meta:{
            title:"个人中心"
        }
    },
    {
        path:"*",
        redirect:"/"
    }
]

// 动态校验组件
function Element (props){ // 可以做很多复杂的事情，比如动态校验，权限校验等等
    let {component:Component,history,location,match} =props;
    
    let config = {
        history,
        location,
        match
    }
    return <Component {...config}></Component>;
}

// 将路由表转换为路由组件（动态路由）,不循环children，要处理meta和redirect
export const routerComponent = (router) => {
    return <switch>
        {router.map((item,index)=>{
            if(item.redirect){
                return <Redirect key={index} from={item.path} to={item.redirect} />
            }else{
                // 边界判断什么什么的
                return <Route key={index} path={item.path} exact={item.exact} render={()=>{
                    document.title = item?.meta?.title || ''; // 修改页面的title，这里可以做权限判断
                    // 不直接渲染组件，而是渲染一个函数，这个函数返回组件
                    return <Element {...item} />
                }} />
            }
        })}
    </switch>
}




export default router;


