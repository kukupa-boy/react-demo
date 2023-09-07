import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import reduxLogger from "redux-logger";
import promise from "redux-promise";
// 根据不同的环境使用不同的中间件
// 开发环境使用redux-logger
let middlewares = [thunk, promise];
if (process.env.NODE_ENV === "development") {
    middlewares.push(reduxLogger);
}
const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
    );
export default store;
