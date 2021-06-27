import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import quiz from "./modules/quiz";
import rank from "./modules/rank";
import { createBrowserHistory } from "history";

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

export const history = createBrowserHistory();

const rootReducer = combineReducers({ quiz, rank });

const store = createStore(rootReducer, enhancer);

export default store;
