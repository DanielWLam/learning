import React, { Component } from 'react';
import { DatePicker, message } from 'antd';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: ''
    }
  }
  handleChange (date) {
    message.info('fhh' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div className="App" style={{width: 400,margin: '100px auto'}}>
        <DatePicker onChange={value => this.handleChange(value)}></DatePicker>
        <div style={{marginTop: 20}}>
          当前日期：{this.state.date.toString()}
        </div>
      </div>
    );
  }
}

export default App;
