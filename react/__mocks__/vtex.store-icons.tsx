import React, { FunctionComponent } from 'react'

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

export const IconAssistantSales: FunctionComponent<{
  size: number
  className: string
  activeClassName: string
}> = ({ size = 20, className, activeClassName }) =>
  iconMock({ name: 'IconAssistantSales', size, className, activeClassName })

export const IconProfile: FunctionComponent<{
  size: number
  className: string
  activeClassName: string
}> = ({ size = 20, className, activeClassName }) =>
  iconMock({ name: 'IconProfile', size, className, activeClassName })
