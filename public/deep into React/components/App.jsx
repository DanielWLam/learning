import React from 'react'
import Tab from './Tab.jsx'
import TabPane from './TabPane'
import QRCode from './Chapter2/QRCode'
import MyComponent from './Chapter2/HOC/MyComponentDecorator'

export default class App extends React.Component {
  getContent () {
    // return (
    //   <Tab 
    //   classPrefix={'tab'}
    //   defaultActiveIndex={0}
    //   >
    //     <TabPane key={0} tab={'Tab1'} order={'0'}>First</TabPane>
    //     <TabPane key={1} tab={'Tab2'} order={'1'}>Second</TabPane>
    //     <TabPane key={2} tab={'Tab3'} order={'2'}>Third</TabPane>
    //   </Tab>
    // )
    // return (<QRCode></QRCode>)
    return <MyComponent></MyComponent>
  }
  render () {
    return <div>
      {this.getContent()}
    </div>
  }
}
