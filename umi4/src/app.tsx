/** 
 * Umi 区别于其他前端框架，没有显式的程序主入口（如 src/index.ts）
 * 当你需要添加全局 Context 、修改应用运行时，请使用 app.tsx 
 * */

import { matchRoutes } from 'umi'; // 可以用地址和路由表匹配出对应的路由

// 全局改变，设置路由
export function onRouteChange({ clientRoutes, location }) {// clientRoutes相当于路由表
    console.log("111",clientRoutes, location)
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  if (route) {
    document.title = route.title || '';
  }
}