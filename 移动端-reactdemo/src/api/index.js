// 接口
import http from './http';

// 获取今日新闻和轮播图信息
export const getNews = () => http.get('/api/news_latest');
// 获取往日新闻
export const getBeforeNews = (time) => http.get(`/api/news_before`,{
    params:{
        time
    }
});
// 获取新闻详细信息
export const getNewsDetail = (id) => http.get(`/api/news_info`,{
   params:{
    id
   } 
})

// 获取新闻点赞信息
export const getStoryExtra = (id) => http.get(`/api/story_extra`,{
    params:{
     id
    } 
 })
 // 发送验证码
export const sendCode = (phone) => http.post(`/api/phone_code`,{
    phone
})
// 登陆/注册
export const login = (phone,code) => http.post(`/api/login`,{
    phone,
    code
})

// 下面的接口都需要在headers['authorization'] = token；中添加tokrn信息
// 获取登陆者信息
export const queryUserInfo = () => http.get('/api/user_info');
 
// 收藏新闻
export const collectNews = (id) => http.post('/api/store',{
    newsId:id
});
// 取消收藏
export const cancelCollect = (id) => http.get('/api/store_remove',{
    params:{
        id
    }
});
// 获取收藏列表
export const getCollectList = () => http.get('/api/store_list');
// 删除收藏列表
// export const storeRemove = () => http.get('/api/store_clear');

// 图片上传
// export const uploadImg = (file) => {
//     let fm = new FormData(); // formdata对象(文件上传都是这个类型)
//     fm.append('file',file);
//     return http.post('/api/upload',{
//         fm
//     })
// ;}
export const uploadImg = (file) => {
    let fm = new FormData();
    fm.append('file', file);
    return http.post('/api/upload', fm);
};

// 修改信息
export const updateUserInfo = (username,pic) => http.post('/api/user_update',{
    username,
    pic
});