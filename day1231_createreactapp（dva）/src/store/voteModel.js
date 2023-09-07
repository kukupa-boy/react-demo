import _ from '../assets/utils';
const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

export default {
    namespace: 'vote',
    state: {
        supNum: 10,
        oppNum: 5
    },
    reducers: { // 同步操作
        support(state, action) {
            state = _.clone(true, state);
            let { payload = 1 } = action;
            state.supNum += payload;
            return state;
        },
        oppose(state, action) {
            state = _.clone(true, state);
            let { payload = 1 } = action;
            state.oppNum += payload;
            return state;
        }
    },
    effects: { // 异步操作
        supportAsync: [
            function* ({ payload }, { call, put }) {
                yield call(delay, 2000);
                yield put({
                    type: 'support',
                    payload
                });
            },
            { type: 'takeLatest' }
        ],
        *opposeAsync({ payload }, { call, put }) {
            yield call(delay, 2000);
            yield put({
                type: 'oppose',
                payload
            });
        }
    }
};
