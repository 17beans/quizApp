import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import quiz from "./modules/quiz";
import rank from "./modules/rank";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

const middlewares = [thunk];

export const history = createBrowserHistory();

// 공식 문서에 보니 compose로 routerMiddleware(history)와 다른 middlewares를 compose()로 묶으라고 돼있음
const enhancer = compose(
  // 여기에 원래 ...middlewares만 있었는데 그 앞에 routerMiddleware(history)를 추가한 것
  applyMiddleware(routerMiddleware(history), ...middlewares)
);

const rootReducer = combineReducers({
  router: connectRouter(history),
  quiz,
  rank,
});

const store = createStore(rootReducer, enhancer);

export default store;
