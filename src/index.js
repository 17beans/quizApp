import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { Provider } from "react-redux";
import store, { history } from "./redux/configStore";

// window.Kakao.init("9619962b15a84167783315a66d0e50e3");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
