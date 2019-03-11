import React from 'react'

export const Button = ({ children = undefined, onClick = () => {} }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
)

export const Input = (props: any) => <input {...props} />
