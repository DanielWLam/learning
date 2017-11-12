import React, { Component } from 'react'
import BoilingVerdict from './BoilingVerdict'

class Calculator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      temperature: '100'
    }
  }
  handleChange (e) {
    this.setState({
      temperature: e.target.value
    })
  }
  render () {
    const temperature = this.state.temperature
    return (
      <fieldset>
        <legend>Enter temperature in Celsius: </legend>
        <input type="text" value={temperature} onChange={this.handleChange.bind(this)}/>
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    )
  }
}

export default Calculator
