import React from 'react'
import PropTypes from 'prop-types'

const CustomerIcon = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      color={color}
    >
      <use href="#customer" xlinkHref="#customer" />
    </svg>
  )
}

CustomerIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

CustomerIcon.defaultProps = {
  size: 20,
  color: 'white',
}

export default CustomerIcon
