import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import { UserManage } from "../user/views/UserManage";
// import { UserContent } from "../user/views/UserContent";
class UserContent extends React.Component {
  render() {
    return <div>1</div>;
  }
}
import App from "./app.js";
import About from "./about.js";
export const Admin = (
  <App>
    <Switch>
      {/* <Route path="/admin/test" component={App} /> */}
      <Route path="/admin/about" component={About} />
      <Route path="/admin/h" component={About} />
      <Redirect to="/admin/about" />
    </Switch>
  </App>
);
