import React, { useState } from "react";
import NavBarAgain from '../components/NavBarAgain';
import ButtonAgain from '../components/ButtonAgain';
import styled from "styled-components";
import { ImageUploader, Input, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import action from '../store/actions';
import {uploadImg,updateUserInfo} from '../api';

/* 样式 */
const UpdateBox = styled.div`
    .formBox {
        padding: 30px;

        .item {
            display: flex;
            align-items: center;
            height: 110px;
            line-height: 110px;
            font-size: 28px;

            .label {
                width: 20%;
                text-align: center;
            }

            .input {
                width: 80%;
            }
        }
    }

    .submit {
        display: block;
        margin: 0 auto;
        width: 60%;
        height: 70px;
        font-size: 28px;
    }
`;

const Update = function Update(props) {
    console.log("aa",props)
//     // 获取用户信息
   let {info:{name:nameInfo,pic:picInfo},router,getInfo} = props
   let [name,setName] = useState(nameInfo)
   let [pic,setPic] = useState([{url:picInfo}])
   const beforeUploadFn = (file)=>{
        let size = 1*1024*1024 // 
        if(file.size>size){
            Toast.show({
                content:"文件不能大于1M",
                fail:"fail"
            })
            return null
        }
        return file
    }
    const uploadFn = async (file)=>{
        let tmp
        try{
            let {code,pic} = await uploadImg(file)
            if(+code!==0){
                Toast.show({
                    content:"文件上传失败",
                    fail:"fail"
                })
            }else{
                setPic([{url:pic}])
                tmp = pic
            }
        }catch(E){}
        return {
            url: tmp
        }
    }
    const deleteFn = ()=>{
        setPic([])
    }
   const changeName = (value) =>{
        setName(value)
   }
   const submit = async ()=>{
    if(name===""){
        Toast.show({
            content:"请输入账号",
            fail:"fail"
        })
        return
    }
    if(pic.url===""){
        Toast.show({
            content:"请上传图片",
            fail:"fail"
        })
        return
    }
    try{
        let {code} = await updateUserInfo(name,pic[0].url)
        if(!+code===0){
            Toast.show({
                content:"修改账号失败",
                fail:"fail"
            })
        }else{
            getInfo()
            router.navigate(-1)
        }
    }catch(e){}
   }
    return <UpdateBox>
        <NavBarAgain title="修改信息" />
        <div className="formBox">
            <div className="item">
                <div className="label">头像</div>
                <div className="input">
                    <ImageUploader
                        value={pic}
                        maxCount={1}
                        onDelete={deleteFn}
                        beforeUpload={beforeUploadFn}
                        upload={uploadFn}
                    />
                </div>
            </div>
            <div className="item">
                <div className="label">姓名</div>
                <div className="input">
                    <Input placeholder='请输入账号名称'
                        value={name}
                        onChange={changeName} />
                </div>
            </div>
            <ButtonAgain color='primary' className="submit"
                onClick={submit}>
                提交
            </ButtonAgain>
        </div>
    </UpdateBox>;
};
export default connect(
    state => state.base,
    action.base
)(Update);