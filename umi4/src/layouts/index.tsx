
/*
  1. layout文件是干嘛的
    spa单页面应用的视图入口文件（相当于app.vue）
    路由匹配的组件一般在page文件夹中，匹配的组件放在outlet中进行渲染
    layout除了放视图入口文件外，还可以放component通用组件
*/

import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
