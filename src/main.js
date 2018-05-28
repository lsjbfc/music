import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import App from "./views/app.js";
import About from "./views/about.js";
import Home from "./views/home.js";
// import { Router, Route, Switch, Link, IndexRoute } from "react-router";
// import { hashHistory } from "react-router";
import { HashRouter } from "react-router-dom";
import { Router, Route, IndexRoute, Redirect } from "react-router";
import "./style/reset.css";
class IndexComponent extends React.Component {
  render() {
    return <h1>hello world!!!</h1>;
  }
}
const routes = (
  <HashRouter>
    <div>
      <div>
        <Route path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
      </div>
    </div>
  </HashRouter>
);
ReactDOM.render(<div>{routes}</div>, document.getElementById("root"));
registerServiceWorker();
