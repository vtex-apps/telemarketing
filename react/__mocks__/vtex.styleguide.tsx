import React, { FunctionComponent, ReactNode } from 'react'

export const Button: FunctionComponent<{
  onClick: () => void
  children: ReactNode
}> = ({ onClick = () => {}, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
)

export const Input: FunctionComponent = (props: any) => <input {...props} />
