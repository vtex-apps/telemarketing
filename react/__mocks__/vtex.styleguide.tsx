import React from 'react'

export const Button = ({ children = undefined }) => (
  <button type="button"> {children} </button>
)

export const Input = (props: any) => <input {...props} />
