import React, { FunctionComponent, ReactNode } from 'react'

export const Button: FunctionComponent<{
  type?: 'button' | 'submit'
  onClick: () => void
  children: ReactNode
}> = ({ type = 'button', onClick = () => {}, children }) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
)

export const Input: FunctionComponent = ({ label, error, errorMessage, ...props}: any) => (
  <label>
    {label}
    <input {...props} />
    {error
      ? <span data-testid="error-message">{errorMessage}</span>
      : null
    }
  </label>
)
