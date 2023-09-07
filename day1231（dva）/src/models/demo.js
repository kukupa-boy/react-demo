// 路由懒加载指定的model（dynamic）

/*
    1.model一般都打包到主文件中，页面一加载models都会加载完毕，如果模块过多，
    会导致主文件过大，影响页面加载速度，
    2.所以我们可以使用路由懒加载，只有当路由被访问时，才会加载对应的model，(才能被访问到)
    所以我们只把当前页面需要的model打包到当前页面中，这样可以减少主文件的大小（dynamic）

*/
// model一般都放置src/models目录下
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
    namespace: 'demo',
    // 用于存放状态
    state: {
        num:10,
    }, 
    /*
         用于更改状态的同步操作（把原有的switch/case状态都写错成一个单独的方法），
            特点是1.同步操作, 2.必须是纯函数，不能有副作用，所以不能改变原来的state，只能返回一个新的state（）
    */
    reducers: { 
        increment(state,action){// state当前板块的状态，action派发的动作
           state = {...state};
            return {
                ...state,
                num: state.num + action.payload
            }
        }
    }, 
   /*异步操作，
        等同于redux-saga中的generator函数const saga = function*(){yield take('asyncIncrement',working)}
        
        1. 和redux-saga一样，不能和reducer同名，不然会调用两次(一般在前面加上async)
        2. 必须是generator函数
        3. 不能直接修改state，只能通过put调用reducer
        
        第二个参数是saga提供的异步api函数，基本上都有，但是没有delay和debounce
        基于yield select可以获取到所有模块下的状态


   */
    effects: {
        // 1.直接这样写默认使用的是takeEvery函数来监听
        
        // *asyncIncrement(action, { call, put }) { 
        //     yield call(delay, 1000);
        //     // call调用service
        //     // put调用reducer
        //     yield put({ type: 'increment', payload: action.payload });
        // },


        // 2.可以使用数组方式来监听，第一项是working函数，第二项是监听使用的方法

        asyncIncrement:[
            function* (action, { call, put }) { 
                yield call(delay, 1000);
                // call调用service
                // put调用reducer
                yield put({ type: 'increment', payload: action.payload });
            },
            {type:'takeLatest'}
        ],
    } ,
   subscriptions: {} // 订阅
}