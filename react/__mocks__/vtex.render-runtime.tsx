import React, { FunctionComponent, ReactNode } from 'react'

export const useRuntime = () => {
  const hints = { mobile: false, desktop: true }
  return { hints }
}

export const Link: FunctionComponent<{ page: string; children: ReactNode }> = ({
  page,
  children,
}) => <a href={page}>{children}</a>
