// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request('/api/adminUser/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 上传文件
 * 
 */
export async function upload(data:any,options?: any) {// 自动转换为formdata转换为服务器
  let formData = new FormData();
  formData.append('file', data.file); 
  return request('/api/upload/file', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  })
  
}

/** 登录接口 POST /api/adminUser/login */
export async function login(body:any, options?:any) {
  console.log("body",body)
  return request('/api/adminUser/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      userName: body.username,
      passwordMd5: body.password,
    },
    ...(options || {}),
  }).then(({resultCode, data})=>{ // 在组件中使用之前，先对数据进行处理
    if(data){
      data = {
        ...data,
        name:data.nickname,
        avatar:"https://bqq.gtimg.com/qidian/src/sites/srv/wpa/conf/wpa/avatar/1-1.png",
      }
      return {resultCode, data}
    } 
    
  })
  
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
