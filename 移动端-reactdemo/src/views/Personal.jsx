import React from "react";
import { Link } from 'react-router-dom';
import { RightOutline } from 'antd-mobile-icons';
import styled from "styled-components";
import NavBarAgain from '../components/NavBarAgain';
import { connect } from 'react-redux';
import action from '../store/actions';
import _ from '../assets/utils';
import { Toast } from 'antd-mobile';

/* 样式 */
const PersonalBox = styled.div`
    .baseInfo {
        box-sizing: border-box;
        margin: 40px 0;
        .pic {
            display: block;
            margin: 0 auto;
            width: 172px;
            height: 172px;
            border-radius: 50%;
        }
        .name {
            line-height: 100px;
            font-size: 36px;
            text-align: center;
            color: #000;
        }
    }
    .tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        color: #000;
        border-bottom: 2px solid #EEE;
    }
`;

const Personal = function Personal(props) {
    let { info, clearUserInfo, clearStoreList, router } = props;
    // 退出登录
    const signout = () => {
        // 清除redux中的信息
        clearUserInfo();
        clearStoreList();
        // 清除Token
        _.storage.remove('tk');
        // 提示
        Toast.show({
            icon: 'success',
            content: '您已安全退出'
        });
        // 跳转
        router.navigate('/Login?to=/Personal', { replace: true });
    };
    return <PersonalBox>
        <NavBarAgain title="个人中心" />
        <div className="baseInfo">
            <Link to='/Update'>
                <img className="pic" src={info.pic} alt="" />
                <p className="name">{info.name}</p>
            </Link>
        </div>
        <div>
            <Link to='/Store' className="tab">
                我的收藏
                <RightOutline />
            </Link>
            <div className="tab" onClick={signout}>
                退出登录
                <RightOutline />
            </div>
        </div>
    </PersonalBox>;
};
export default connect(
    state => state.base,
    {
        clearUserInfo: action.base.clearUserInfo,
        clearStoreList: action.store.clearStoreList
    }
)(Personal);