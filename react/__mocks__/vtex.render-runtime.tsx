import React, { FunctionComponent, ReactNode } from 'react'

export const withRuntimeContext: FunctionComponent = (comp: any) => comp

export const Link: FunctionComponent<{ page: string; children: ReactNode }> = ({
  page,
  children,
}) => <a href={page}>{children}</a>
