import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Tab from './components/Tab.jsx'
import TabPane from './components/TabPane'

ReactDOM.render(<Tab 
  classPrefix={'tab'}
  defaultActiveIndex={0}
  >
    <TabPane key={0} tab={'Tab1'} order={'0'}>First</TabPane>
    <TabPane key={1} tab={'Tab2'} order={'1'}>Second</TabPane>
    <TabPane key={2} tab={'Tab3'} order={'2'}>Third</TabPane>
  </Tab>, document.getElementById('app'))
