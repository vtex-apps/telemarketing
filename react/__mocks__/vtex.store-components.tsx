import React from 'react'

export const Container = ({ children, className }) => {
  return <section className={`Container-mock ${className}`}>{children}</section>
}
