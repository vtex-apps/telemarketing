import React, { FunctionComponent, ReactNode } from 'react'

export const Container: FunctionComponent<{
  className: string
  children: ReactNode
}> = ({ className, children }) => (
  <section className={`Container-mock ${className}`}>{children}</section>
)
