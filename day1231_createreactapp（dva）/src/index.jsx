import dva from 'dva';
import createHistory from 'history/createHashHistory';
import RouterConfig from './router';
import voteModel from './store/voteModel';

const app = dva({ 
  history: createHistory()
});
app.use({}); // 使用插件
app.model(voteModel); // 使用模块
app.router(RouterConfig); // 使用路由
app.start('#root'); // 启动项目