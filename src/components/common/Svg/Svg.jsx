import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';

class Svg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    const props = this.props;
    const { hash,herf,title, className, ...others } = props;
    return (
        <svg className={classnames("svg-default",{[`${className}`]:true})} title={title}>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={(herf?herf:(require('./images/icon.svg')+(hash||"#svg-github")))} />
        </svg>
    )
  }
}

export default Svg
