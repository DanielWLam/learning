import React, {Component} from 'react'
import MyContainer from './MyContainer'

@MyContainer
class MyComponent extends Component {
  render () {
    return (
      <p>Hi, my name is {this.props.name}</p>
    )
  }
}

export default MyComponent
