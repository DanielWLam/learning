import React, {Component} from 'react'

export default class QRCode extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }
  handleOnClick = (e) => {
    console.log(!this.state.active)
    e.stopPropagation()
    this.setState({
      active: !this.state.active
    })
  }
  handleClickCode = (e) => {
    e.stopPropagation()
  }
  componentDidMount () {
    document.addEventListener('click', e => {
      console.log('111')
      this.setState({
        active: false
      })
    })
    document.querySelector('.qr').addEventListener('click', e => {
      e.stopPropagation()
      this.setState({
        active: !this.state.active
      })
    })
  }
  componentWillUnmount () {
    document.removeEventListener('click')
    document.querySelector('.qr').removeEventListener('click')
  }
  render () {
    return (
      <div className="qr-wrapper">
        <button className="qr">二维码</button>
        <div 
          className="code"
          style={{display: this.state.active ? 'block' : 'none'}}
        >
          666
        </div>
      </div>
    )
  }
}
