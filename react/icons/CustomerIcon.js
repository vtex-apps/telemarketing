import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CustomerIcon extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
  }

  static defaultProps = {
    size: 20,
    color: 'white',
  }

  render() {
    const { size, color } = this.props
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 21 21"
        fill="none"
        color={color}
      >
        <use href="#customer" />
      </svg>
    )
  }
}
