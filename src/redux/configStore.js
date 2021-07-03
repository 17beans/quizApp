import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import quiz from "./modules/quiz";
import rank from "./modules/rank";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

const middlewares = [thunk];

export const history = createBrowserHistory();

const enhancer = compose(
  applyMiddleware(routerMiddleware(history), ...middlewares)
);

const rootReducer = combineReducers({
  router: connectRouter(history),
  quiz,
  rank,
});

const store = createStore(rootReducer, enhancer);

export default store;
