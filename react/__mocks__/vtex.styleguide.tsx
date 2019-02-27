import React from 'react'

export const Button = ({ children }) => (
  <button type="button"> {children} </button>
)

export const Input = props => <input {...props} />
