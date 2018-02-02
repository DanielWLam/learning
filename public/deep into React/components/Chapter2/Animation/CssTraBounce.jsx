import React, {Component} from 'react'
import {CSSTransition} from 'react-transition-group'
import './bounce.less'

class CssTraBounce extends Component {
  render () {
    return (
      <CSSTransition
        in={this.props.in}
        classNames='bounce'
        timeout={1000}
      >
        <div className='block'>hello world!</div>
      </CSSTransition>
    )
  }
}

export default CssTraBounce
