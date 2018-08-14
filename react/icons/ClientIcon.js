import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ClientIcon extends Component {
  static propTypes = {
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 30,
    color: 'white',
  }

  render() {
    const { size, color } = this.props
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="19"
          height="19"
          fill="black"
          fillOpacity="0"
          transform="translate(1 1)"
        />
        <path
          d="M10.5002 11.1333C12.2491 11.1333 13.6668 9.71556 13.6668 7.96665C13.6668 6.21775 12.2491 4.79999 10.5002 4.79999C8.75126 4.79999 7.3335 6.21775 7.3335 7.96665C7.3335 9.71556 8.75126 11.1333 10.5002 11.1333Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.7732 17.6199C16.2068 16.4364 15.3171 15.4372 14.207 14.7378C13.0968 14.0384 11.8115 13.6672 10.4994 13.6672C9.18728 13.6672 7.90194 14.0384 6.7918 14.7378C5.68166 15.4372 4.79201 16.4364 4.22559 17.6199"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 20C15.7467 20 20 15.7467 20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
}
