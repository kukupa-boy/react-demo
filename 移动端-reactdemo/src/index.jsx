import React from 'react';
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from "antd-mobile";
import zhCN from 'antd-mobile/es/locales/zh-CN'
import "./flexible" // 解决在开发环境切换模拟器的时候font-size最大为54px的问题
// import "lib-flexible"
import App from "./App"
import "./index.css"

import { Provider } from 'react-redux';
import store from "./store";
/**
 * 处理最大宽度
 */
(function(){
  const handleMAX = function(){
    let html = document.documentElement;
    let root = document.getElementById('root');
    let width = html.clientWidth;
    root.style.maxWidth ='750px';
    if(width >= 750){
      html.style.fontSize ='75px';
    }
  }
  handleMAX();
  window.addEventListener('resize',handleMAX); 
})()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
