import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TelemarketingIcon extends Component {
  static propTypes = {
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 30,
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
        <rect
          width="19"
          height="19"
          fill="black"
          fillOpacity="0"
          transform="translate(1 1)"
        />
        <path
          d="M10.5 20C15.7467 20 20 15.7467 20 10.5C20 5.25329 15.7467 1 10.5 1C5.25329 1 1 5.25329 1 10.5C1 15.7467 5.25329 20 10.5 20Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          width="10.5556"
          height="7.74074"
          fill="black"
          fillOpacity="0"
          transform="translate(5.22217 3.81482)"
        />
        <path
          d="M10.4997 11.5556C12.2486 11.5556 13.6663 10.1378 13.6663 8.3889C13.6663 6.63999 12.2486 5.22223 10.4997 5.22223C8.75077 5.22223 7.33301 6.63999 7.33301 8.3889C7.33301 10.1378 8.75077 11.5556 10.4997 11.5556Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.0739 8.38889C15.0739 5.8627 13.026 3.81482 10.4999 3.81482C7.97366 3.81482 5.92578 5.8627 5.92578 8.38889"
          stroke="white"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 8C15 9.10457 12.7614 10 10 10"
          stroke="white"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="5.22217"
          y="7.33334"
          width="1.40741"
          height="2.81481"
          rx="0.703704"
          fill="white"
        />
        <rect
          x="14.3701"
          y="7.33334"
          width="1.40741"
          height="2.81481"
          rx="0.703704"
          fill="white"
        />
        <rect
          width="12.0829"
          height="3.80634"
          fill="black"
          fillOpacity="0"
          transform="translate(4.51855 13.9017)"
        />
        <path
          d="M16.6014 17.7081C16.056 16.5684 15.1993 15.6062 14.1303 14.9327C13.0612 14.2591 11.8235 13.9017 10.56 13.9017C9.29649 13.9017 8.05875 14.2591 6.98973 14.9327C5.9207 15.6062 5.064 16.5684 4.51855 17.7081"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
}
