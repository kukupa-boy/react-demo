// npm view xxx versions 查看npm包的历史版本
import dva from 'dva';
import voteModel from './models/vote';
import createLoading from "dva-loading";
// import "@babel/polyfill"; // 对js中的特殊api进行兼容
// 1. Initialize
const app = dva({
    // 可以指定路由的模式 history
    // 可以扩展其他的中间件 redux-logger等等 entraEnhancers
    // initialState => ({ // 给model赋值初始状态值（保证其他设置的值不是懒加载的），高于其他model板块的初始值
        // 这里拿不到demomodel的值，因为这里是初始化的时候，还没有加载model（demo是懒加载的）
    //     demo: {
    //         num: 10
    //     }
    // })

    // 1. 可以导入其他中间件进行使用
    //  extraEnhancers:[]
    });

// 2. Plugins  处理相关的插件(比较常用的插件就是dva-loading，详见图片k.jpg,目的就是实现一个loading效果)
// 导入这个插件后，默认在redux状态中加入一个loading的状态（全局公共状态，不在任何一个模块中），可以通过loading.global来获取这个状态（详见demo.jsx的使用）
app.use(createLoading());

// 将app挂载到window下，也可以将它挂载在context上
//在所有组件中都可以获取
window.app = app;

/*
    model一般都打包到主文件中，页面一加载models都会加载完毕，如果模块过多，
    会导致主文件过大，影响页面加载速度，所以我们可以使用路由懒加载，只有当路由被访问时，
    才会加载对应的model，所以我们只把当前页面需要的model打包到当前页面中，这样可以减少主文件的大小
*/


// 3. Model 把model放在主js文件中的方法
app.model(voteModel);
// app.model(其他的model文件); // 可以执行多次

// 4. Router // 可以在源码的dva li bindex.js中修改此处的报错
app.router(require('./router').default);

// 5. Start  在这里之前要处理router
app.start('#root');