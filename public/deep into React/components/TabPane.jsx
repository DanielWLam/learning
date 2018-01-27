import React, {Component} from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

export default class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    order: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    isActive: PropTypes.bool
  }
  render () {
    const {classPrefix, className, isActive, children} = this.props
    const classes = cn({
      [className]: className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-active`]: isActive
    })
    return (
      <div
        role="tabpanel"
        className={classes}
        aria-hidden={!isActive}
      >
        {children}
      </div>
    )
  }
}
