import React from 'react';
import './App.css';
import Clock from './Clock'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isToggleOn: true
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState(prevState => {
      return {
        isToggleOn: !prevState.isToggleOn
      }
    })
  }
  render () {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    )
  }
}

export default App;
