import React from 'react'

const iconMock = ({
  name = '',
  size = 20,
  className = '',
  activeClassName = '',
}) => (
  <svg
    width={size}
    height={size}
    className={`${name}-mock ${className} ${activeClassName}`}
  >
    <rect width={size} height={size} />
  </svg>
)

export const IconAssistantSales = ({ size = 20, activeClassName = '' }) =>
  iconMock({ name: 'IconAssistantSales', size, activeClassName })

export const IconProfile = ({ size = 20, className = '' }) =>
  iconMock({ name: 'IconProfile', size, className })
