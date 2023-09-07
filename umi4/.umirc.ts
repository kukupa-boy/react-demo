// 配置文件 https://umijs.org/zh-CN/docs/config
// 一般写在config文件夹中（）可以废弃这个文件
import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
});
