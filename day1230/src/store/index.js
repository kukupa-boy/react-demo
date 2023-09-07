import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(saga); // 启动saga监听器
export default store;