import React, { useEffect } from "react";
import { SwipeAction, Toast } from 'antd-mobile';
import styled from "styled-components";
import { connect } from 'react-redux';
import action from '../store/actions'
import NavBarAgain from '../components/NavBarAgain';
import NewsItem from '../components/NewsItem';
import SkeletonAgain from '../components/SkeletonAgain';
import {cancelCollect} from "../api";

/* 样式 */
const StoreBox = styled.div`
    .box {
        padding:30px;

    }
`;

const Store = function Store(props) {
    let { list: storeList, getStoreListSync, cancelCollectId } = props;
    useEffect(() => {
        // 第一次加载完毕:如果redux中没有收藏列表,则异步派发获取
        if (!storeList) getStoreListSync();
        console.log("list",storeList)
    }, []);

    // 移除收藏
    const handleRemove = async (id) => {
        try {
            let { code } = await cancelCollect(id);
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '移除失败'
                });
                return;
            }
            Toast.show({
                icon: 'success',
                content: '移除成功'
            });
            cancelCollectId(id);
        } catch (_) { }
    };

    return <StoreBox>
        <NavBarAgain title="我的收藏" />
        {storeList ?
            <div className="box">
                {/* {JSON.stringify(storeList)} */}
                {storeList.map(item => {
                    let { id, news } = item;
                    return <SwipeAction key={id} rightActions={[{
                        key: 'delete',
                        text: '删除',
                        color: 'danger',
                        onClick: handleRemove.bind(null, news.id)
                    }]}>
                        <NewsItem info={news} />
                    </SwipeAction>;
                })}
            </div> :
            <SkeletonAgain />
        }
    </StoreBox>;
};
export default connect(
    state => state.store,
    action.store
)(Store);