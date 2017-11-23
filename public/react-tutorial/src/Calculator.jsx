import React, { Component } from 'react'
import TemperatureInput from './TemperatureInput'
class Calculator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scale: 'c',
      temperature: '100'
    }
  }
  handleCelsiusChange (temperature) {
    this.setState({
      scale: 'c',
      temperature
    })
  }
  handleFChange (temperature) {
    this.setState({
      scale: 'f',
      temperature
    })
  }
  render () {
    const temperature = this.state.temperature
    const scale = this.state.scale
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
    return (
      <div>
        <TemperatureInput
          temperature={celsius}
          scale="c"
          onTemperatureChange={this.handleCelsiusChange.bind(this)}
        />
        <TemperatureInput
          temperature={fahrenheit}
          scale="f"
          onTemperatureChange={this.handleFChange.bind(this)}
        />
      </div>
    )
  }
}

function tryConvert (temperature, func) {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ''
  }
  const output = func(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

export default Calculator
