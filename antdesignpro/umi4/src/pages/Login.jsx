import React from 'react';
import { flushSync } from 'react-dom';
import { LoginForm,ProFormText,ProConfigProvider } from '@ant-design/pro-components';
import {UserOutlined,LockOutlined} from "@ant-design/icons"
import { useEmotionCss } from '@ant-design/use-emotion-css';
import api from "../services/ant-design-pro"
import md5 from "blueimp-md5"
import {message} from "antd"
import _ from "../utils/utils"
// @ts-ignore
import { Helmet,useModel,useNavigate,useSearchParams } from '@umijs/max';
function Login(){
    let {initialState,setInitialSate} = useModel("@@initialState")
    let navigate = useNavigate()
    let [searchParams] = useSearchParams()
    const contaion = useEmotionCss(()=>{
        return {
           display:"flex",
            alignItems:"center",
            marginTop:"150px"

        }
    })
    const submit = async (value)=>{
        let {api:{login}} = api 
        let {api:{currentUser}} = api
        let {username,password} = value
        password = md5(password)
        try{
           let {resultCode,data} = await login({username,password})
            if(+resultCode !== 200){
                message.error("登陆失败")
                return
            }
            // 存储token
            _.storage.set("tk",data)
            // 获取用户信息
            let {resultCode:code,data:info} = await currentUser()
            if(+code !== 200){
                message.error("登陆失败")
                navigate("/")
                return
            }
            flushSync(()=>{ // 立即更新公共状态
                setInitialSate({
                    ...initialState,
                    currentUser:{
                         ...info
                    }
                 })
            })
            // 存储账号密码
            _.storage.set("userInfo",{
                username,
                password
            })
            if(searchParams.get("id")){
                navigate(searchParams.get("id"),{replace:true})
            }else{
                navigate("/")
            }
        }catch(err){/*message.error("登陆失败")*/}
    }
    return <ProConfigProvider hashed={false}>
        {/* 用于修改页面的title，不会在页面显示 */}
        <Helmet>
            <title>登陆</title>
        </Helmet>
        <div className={contaion}>
        <LoginForm
            logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="CMS管理"
            style={{marginTop:"20px"}}
            subTitle="注意保护个人信息"
            initialValues={{username:"admin",password:"123456"}}
            onFinish={submit}
            >
            <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
            <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
        </LoginForm>
        </div>
        </ProConfigProvider>
}
export default Login;