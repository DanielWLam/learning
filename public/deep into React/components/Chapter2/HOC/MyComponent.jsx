import React, {Component} from 'react'
import MyContainer from './MyContainer'
 
class MyComponent extends Component {
  render () {
    return (
      <h1>Hello, I am {this.props.name}</h1>
    )
  }
}

export default MyContainer(MyComponent)
