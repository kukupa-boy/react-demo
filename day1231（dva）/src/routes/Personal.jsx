import React from "react";
import { NavLink,Switch,Route,Redirect } from 'dva/router';
import styled from "styled-components";
// import Order from "./personal/MyOrder";
// import Profile from "./personal/MyProfile";
import dynamic from 'dva/dynamic';
/* 样式处理 */
const PersonalBox = styled.div`
    display: flex;
    border:1px solid red;
    .menu{
        width: 60px;
        a{
            display: block;
            color: #000;
            line-height: 35px;
            font-size: 14px;
            &.active{
                color: red;
            }
        }
    }
`;
// 二级路由如何拿到app （window上获取，因为入口页面手动挂载了）
const LazyOrder = dynamic({
    app:window.app,
    models: () => [],
    component: () => import('./personal/MyOrder'),
});
const LazyProfile = dynamic({
    app:window.app,
    models: () => [],
    component: () => import('./personal/MyProfile'),
});
const Personal = function Personal() { 
    
    return <PersonalBox>
        <div className="menu">
            <NavLink to="/personal/order">我的订单</NavLink>
            <NavLink to="/personal/profile">我的信息</NavLink>
        </div>
        <div className="content">
            <Switch>
                <Route path="/personal/order"  component={LazyOrder} />
                <Route path="/personal/profile"  component={LazyProfile} />
                <Redirect from="/personal" exact to="/personal/order" />
            </Switch>
        </div>
    </PersonalBox>;
};
export default Personal;