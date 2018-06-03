import React, { Component } from "react";
import Head from "../commponts/Head.js";
import { Icon, Button } from "antd";
import { Link } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="asider">
      
        {/* <Head title="永夜君王" /> */}
        <Icon type="link" />
        <Link to="/home">home</Link>
        <Icon type="step-forward" />
        {/* <Button onClick={() => this.handelLinkgo()}>HOME</Button> */}
        <Link to="/about">about</Link>
        {this.props.children}
      </div>
    );
  }
  handelLinkgo() {
    // this.$router
    this.props.history.push("/hot");
  }
}

export default App;
