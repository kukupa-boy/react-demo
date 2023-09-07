import React from "react";
import {Button} from "antd";
// routerRedux对象中包含了路由跳转的方法，相比较于props的history对象，不只是可以在组件中跳转，也可以在redux中进行跳转
/**
 * 在redux内部 yield put(routerRedux.push("/personal/profile"))
 * 在组件内部 ，需要基于dispatch派发，dispatch(routerRedux.push("/personal/profile")); // 传参和v5一样
 */
import { routerRedux } from "dva/router";
import {connect} from "dva"; // 雷同于react-redux中的connect,用于连接组件和redux
// import {NavLink} from "dva/router";

// dva跳转的方案包括link和编程式导航
const MyOrder = function MyOrder(props) { // 被路由包含的组件都有history，match，location三个属性
    let {history,dispatch} = props;
    const toPath = function toPath() {
        // history.push("/personal/profile"); //类似v5的路由跳转，传参也和v5一样
        dispatch(routerRedux.push("/personal/profile")); //通过reudx-router的方式跳转
    }
   
    return <div className="myOrderBox">
        我的订单
        <Button type="primary" onClick={toPath}>Primary</Button>
    </div>;
};
export default connect()(MyOrder);