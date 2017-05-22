import React, { Component, PropTypes } from 'react'
import './App.scss';

class Index extends Component {

  render() {
    return (
      <div className="app-container">
        <p className="title">dsafdsaf</p>
        <div>
        {this.props.children}
        </div>
      </div>
    )
  }
}

export default Index
