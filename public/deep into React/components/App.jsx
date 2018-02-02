import React from 'react'
import Tab from './Tab.jsx'
import TabPane from './TabPane'
import QRCode from './Chapter2/QRCode'
import MyComponent from './Chapter2/HOC/MyComponentDecorator'
import Fade from './Chapter2/Animation/Fade'
import CssTraBounce from './Chapter2/Animation/CssTraBounce'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      in: false
    }
  }
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
    // return <MyComponent></MyComponent>
    return (<CssTraBounce in={this.state.in} />)
  }
  toggleEnterState = () => {
    this.setState({
      in: !this.state.in
    })
  }
  render () {
    return <div>
      {this.getContent()}
      <button onClick={this.toggleEnterState}>click to enter</button>
    </div>
  }
}
