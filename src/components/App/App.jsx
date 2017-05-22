import React, { Component, PropTypes } from 'react'
// import Three from "src/utils/three";
import './App.scss';

class Index extends Component {

  render() {
    return (
      <div className="app-container">
        {this.props.children}
      </div>
    )
  }
}

export default Index
