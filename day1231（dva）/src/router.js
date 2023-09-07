// 页面入口文件，相当于create-app中的index.jsx
import React from 'react';
// dva/router 包含了 1.react-router-dom v5-的所有功能,没有hook路由api，
 // 2.还包括routerRedux[将redux和router结合起来]（允许在redux中进行路由跳转）

 import { routerRedux } from "dva/router";// [详细使用看myOrder.jsx]
 
 // 高阶组件，让不是路由管控的组件也有路由管控的能力(让他具有路由的三个属性)
 import { withRouter } from "dva/router"; 
 // 路由使用的是v5版本
import { Router, Route, Switch,Redirect } from 'dva/router';
import dynamic from 'dva/dynamic'; // 用于实现路由懒加载
import Vote from './routes/Vote';
// import Demo from './routes/Demo';
// import Personal from './routes/Personal';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import "./index.less";
import "lib-flexible"
/**
 * history是路由跳转的history对象
 * app是基于dva创建的dva对象
 */


const RouterConfig = function RouterConfig({ history ,app}) { 
  const LazyDemo = dynamic({ // 使用dynamic实现路由懒加载
    app, // --> dva对象
    models: () => [  //  --> 对应的redux的module
      import('./models/demo'),
    ],
    // webpackChunkName:"yan"可以让文件打包到yan.js中
    component: () => import(/*webpackChunkName:"yan"*/'./routes/Demo'),
  })
  const LazyPersonal = dynamic({ 
    app, 
    models: () => [ ],
    component: () => import(/*webpackChunkName:"yan"*/'./routes/Personal'),
  })
  return <ConfigProvider locale={zhCN}>
            <Router history={history}>
              <Switch>
                <Route path="/" exact component={Vote}  />
                {/* <Route path="/demo" exact component={Demo} /> */}
                <Route path="/demo" component={LazyDemo}></Route>
                <Route path="/personal" component={LazyPersonal} />
                <Redirect from="*"  to="/" />
              </Switch>
            </Router>;
          </ConfigProvider>;
};

export default RouterConfig;