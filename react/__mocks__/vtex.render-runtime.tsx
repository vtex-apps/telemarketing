import React, { ReactNode } from 'react'

export const useRuntime = () => {
  const hints = { mobile: false, desktop: true }
  return { hints }
}

interface linkProps {
  page: any
  readonly children?: ReactNode
}

export const Link = ({ page, children }: linkProps) => (
  <a href={page}>{children}</a>
)
