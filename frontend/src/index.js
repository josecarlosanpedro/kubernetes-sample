import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "rxjs";
import App from "./root/App";
import store from '../src/stores/Store'
import serviceWorker from "./serviceWorker";
import 'antd/dist/antd.css';



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker();