import React, { useState } from "react";
import { Button } from 'antd';
import './Vote.less';

const Vote = function Vote(props) {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);

    const handle = (type) => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    };

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">{props.title}</h2>
            <span className="num">{supNum + oppNum}</span>
        </div>
        <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={handle.bind(null, 'sup')}>支持</Button>
            <Button type="primary" danger onClick={handle.bind(null, 'opp')}>反对</Button>
        </div>
    </div>;
};
export default Vote;