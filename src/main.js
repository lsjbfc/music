import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Router, Route, IndexRoute, Redirect } from "react-router";
import "./style/reset.css";
import { Layout, notification, Icon } from "antd";
import "./style/app.less";
import { AppContainer } from "react-hot-loader";
import App from "./views/app.js";
import About from "./views/about.js";
import Home from "./views/home.js";
import Hot from "./views/Hot.js";
import Other from "./views/other.jsx";
const routes = (
  <AppContainer>
    <HashRouter>
      <div className="main">
        <Route path="/" component={App}>
          {/* <IndexRoute component={Home} /> */}
        </Route>
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Route path="/hot" component={Hot} />
        <Route path="/other" component={Other} />
      </div>
    </HashRouter>
  </AppContainer>
);
ReactDOM.render(<div>{routes}</div>, document.getElementById("root"));
registerServiceWorker();
