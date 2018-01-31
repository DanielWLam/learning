import React, {Component} from 'react'

const MyContainer = (WrappedComponent) => {
  return class extends Component {
    constructor () {
      super()
      this.state = {
        name: 123
      }
    }
    render () {
      return (
        <WrappedComponent {...this.state} {...this.props}></WrappedComponent>
      )
    }
  }
}

export default MyContainer
