import React, { Component } from "react";
import "../../static/iconfont/iconfont.css";
import "../style/head.scss";
class Head extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="header">
        <i className="iconfont icon-menu"/>
      </div>
    );
  }
}

export default Head;
