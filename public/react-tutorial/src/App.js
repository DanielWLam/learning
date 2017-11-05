import React from 'react';
import './App.css';
// import Clock from './Clock'

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
        <form>
          <label>
            Name:
            <input type="text" name="name" value={this.state.value} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)} />
        </form>
      </div>
    )
  }
}


export default App;
