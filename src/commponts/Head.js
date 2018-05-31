import React, { Component } from "react";
import "../style/head.scss";
class Head extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return <div className="header">{this.props.title}</div>;
  }
}

export default Head;
