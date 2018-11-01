import React from 'react'
import PropTypes from 'prop-types'

const TelemarketingIcon = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 21 21"
      fill="none"
      width={size}
      height={size}
    >
      <use href="#telemarketing" xlinkHref="#telemarketing" />
    </svg>
  )
}

TelemarketingIcon.propTypes = {
  size: PropTypes.number,
}

TelemarketingIcon.defaultProps = {
  size: 20,
}

export default TelemarketingIcon
