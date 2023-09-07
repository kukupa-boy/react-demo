import React from "react";
import styled from "styled-components";
import { Button } from 'antd';
import {connect} from 'dva';

/* 样式处理 */
const DemoBox = styled.div`
    margin: 40px auto;
    padding: 20px;
    width: 200px;
    border: 1px solid #DDD;
    .num{
        display: block;
        font-size: 20px;
        line-height: 40px;
    }
    .ant-btn{
        border-radius: 0;
    }
`;
const Demo = function Demo({num,dispatch,loading}) {
    // 当你需要对哪一个模块的异步派发进行loading监听时，需要 loading.effects指定模块名（需要使用dva-loading插件）
    // 最开始为undefined，当开始异步派发的时候变成true，当派发结束后，会根据成功和失败自动将loading变为false
    loading = loading.effects['demo/asyncIncrement']; 
    return <DemoBox>
        <span className="num">{num}</span>
        <Button type="primary" onClick={()=>{
            // type:命名空间/方法名
            dispatch({ // 同步派发
                type:'demo/increment',
                payload: 5
            });
        }}>
            按钮
        </Button>
        <Button type="primary" danger loading={loading} onClick={()=>{
            // type:命名空间/方法名
            dispatch({ // 异步派发
                type:'demo/asyncIncrement',
                payload: 5
            });
        }}>
            异步按钮
        </Button>
    </DemoBox>;
};
// mapDispatcToProps一般不写，可以将dispatch方法通过props传递给组件
export default connect(state=>{
        return {
            ...state.demo,
            loading:state.loading // dva-loading注册的全局loading
        }
    })(Demo);