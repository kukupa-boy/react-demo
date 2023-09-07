// 路由懒加载没有指定model，一般放在app.model中（这样才能在主文件加载的时候加载对应的model，这样其他的都可以使用这个model）
/*
    1.model一般都打包到主文件中，页面一加载models都会加载完毕，如果模块过多，
    会导致主文件过大，影响页面加载速度，
    2.所以我们可以使用路由懒加载，只有当路由被访问时，才会加载对应的model，
    所以我们只把当前页面需要的model打包到当前页面中，这样可以减少主文件的大小（dynamic）
    
*/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
    //  // 命名空间（模块名，这个名字是后期获取状态和派发的标识state={demo:{...},vote:{..}}）
    namespace: 'vote',
     // 管理公共状态
    state: {
        sumNum:0,
        supNum:0,
        oppNum:0
    },
    
    reducers: {
        support (state,action){
            state = {...state};
            return {
                ...state,
                sumNum: state.sumNum + 1,
                supNum: state.supNum + 1
            }
        },
        oppose (state,action){
            state = {...state};
            return {
                ...state,
                sumNum: state.sumNum + 1,
                oppNum: state.oppNum + 1
            }
        }

    },
    
    effects: {
        asyncSupport:[
            function* (action, { call, put }) { 
                yield call(delay, 1000);
                yield put({ type: 'support' });
            },
            { type: 'takeLatest' }
        ],
        asyncOppose:[
            function* (action, { call, put }) { 
                yield call(delay, 2000);
                yield put({ type: 'oppose' });
            },
            { type: 'takeLatest' }
        ]
    },
    // 订阅,
    // 1. 会在页面加载的时候执行，参数是具有history（路由对象）和dispatch（派发的方法）属性
    // 2. 可以基于history监听路由的变化(unlisten取消监听)
    // 3. 可以用来做一些全局的事件绑定，比如监听键盘事件，全局的点击事件
    // 4. 可以用来做一些全局的状态监听，比如监听redux中的状态变化

    // ps: 只要不是懒加载的redux（全局的redux），不论在哪个页面下都会执行，只执行一次，以后路由切换后也不再执行
    subscriptions: {
        async setup(params){
            let {history,dispatch} = params;

            /*
                任何模块加载都会执行
                await delay(3000);
                dispatch({type:'support'}); // 进行reducer的派发
            */

           /**
            * 限制模块加载只在当前路由下执行，利用listen方法监听路由变化
            history.listen( async ({pathname})=>{ // 参数是一个location对象
                if(pathname === '/'){
                    await delay(3000);
                    dispatch({type:'support'});
                }
                unListen(); // 取消监听
            })
            * */
        

        


        }
    }
};

// 在组件中可以基于dva的connect获取到model中的状态和派发的方法,详见demo,jsx的使用