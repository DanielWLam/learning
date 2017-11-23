import React from 'react';
import './App.css';
import WelcomeDialog from './WeclomeDialog'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  handleChange (event) {
    this.setState({
      value: event.target.value.toUpperCase()
    })
  }
  handleSubmit (event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }
  render () {
    return (
      <div>
        <WelcomeDialog />
      </div>
    )
  }
}


export default App;
