import React, { Component } from "react";
import Head from "../commponts/Head.js";
class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Head />
      </div>
    );
  }
}

export default App;
