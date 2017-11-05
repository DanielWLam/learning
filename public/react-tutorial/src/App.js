import React from 'react';
import './App.css';
import Clock from './Clock'

function WarningBanner (props) {
  if (!props.warn) {
    return null
  }
  return (
    <div className="warning">
      Warning!
    </div>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showWarning: true
    }
    this.handleToggleClick = this.handleToggleClick.bind(this)
  }
  handleToggleClick () {
    console.log(123)
    this.setState(prevState => {
      return {
        showWarning: !prevState.showWarning
      }
    })
  }
  render () {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning}></WarningBanner>
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}


export default App;
