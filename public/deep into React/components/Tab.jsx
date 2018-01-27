import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TabContent from './TabContent'

export default class Tab extends Component {
  // static propTypes = {
  //   className: PropTypes.string,
  //   classPrefix: PropTypes.string,
  //   children: PropTypes.oneOfType([
  //     PropTypes.arrayOf(PropTypes.node),
  //     PropTypes.node
  //   ]),
  //   defaultActiveIndex: PropTypes.number,
  //   activeIndex: PropTypes.number,
  //   onChange: PropTypes.func
  // }
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <h1>Hello world!</h1>
        <TabContent name={666} />
      </div>
    )
  }
}
