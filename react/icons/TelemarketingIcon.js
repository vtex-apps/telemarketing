import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TelemarketingIcon extends Component {
  static propTypes = {
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 20,
  }

  render() {
    const { size } = this.props
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="#ds-telemarketing" />
      </svg>
    )
  }
}
