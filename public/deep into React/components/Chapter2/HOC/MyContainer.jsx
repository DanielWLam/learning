import React, {Component} from 'react'

const MyContainer = (WrappedComponent) => {
  return class extends Component {
    render () {
      console.log(this)
      return (
        <WrappedComponent {...this.props}></WrappedComponent>
      )
    }
  }
}

export default MyContainer
