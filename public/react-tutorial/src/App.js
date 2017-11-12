import React from 'react';
import './App.css';
import Calculater from './Calculator'

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
        <Calculater />
      </div>
    )
  }
}


export default App;
