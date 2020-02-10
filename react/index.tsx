import React, { FC, Suspense } from 'react'
import { NoSSR } from 'vtex.render-runtime'
import isMyVtex from './utils/isMyVtex'

const TelemarketingContainer = React.lazy(() => import('./components/TelemarketingContainer'))

const Telemarketing: FC = (props) => {
  if (!isMyVtex()) {
    return null
  }

  return (
    <NoSSR>
      <Suspense fallback={<React.Fragment />}>
        <TelemarketingContainer {...props} />
      </Suspense>
    </NoSSR>
  )
}

export default Telemarketing
