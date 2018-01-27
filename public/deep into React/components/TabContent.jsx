import React, {Component} from 'react'

export default class TabContent extends Component {
  constructor (props) {
    super()
    console.log(this, props)
  }
  handleClick = (e) => {
    console.log(123, e)
  }
  render () {
    return (
      <div>
        <h1>Hello I am TabContent</h1>
        <button onClick={this.handleClick.bind(null)}>Click me!</button>
      </div>
    )
  }
}
