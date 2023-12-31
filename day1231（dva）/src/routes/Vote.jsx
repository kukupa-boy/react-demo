import React from "react";
import styled from "styled-components";
import { Button } from 'antd';
import {connect} from "dva"
// 样式处理
const VoteBox = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    width: 400px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DDD;
        .title {
            font-size: 18px;
            line-height: 50px;
        }
        .num {
            font-size: 18px;
        }
    }

    .main {
        padding: 15px 0;
        p {
            line-height: 35px;
            font-size: 15px;
        }
    }

    .ant-btn {
        margin-right: 10px;
        border-radius: 0;
    }
`;

const Vote = function Vote({supNum,oppNum, sumNum,dispatch}) {
    return <VoteBox>
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{sumNum}</span>
        </div>
        <div className="main">
            <p>支持人数：{oppNum}人</p>
            <p>反对人数：{supNum}人</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={()=>{
                dispatch({type:"vote/asyncSupport"})
            }}>
                支持
            </Button>
            <Button type="primary" danger onClick={
                ()=>{
                    dispatch({type:"vote/asyncOppose"})
                }
            }>
                反对
            </Button>
        </div>
    </VoteBox>;
};
export default connect(state=>state.vote)(Vote);