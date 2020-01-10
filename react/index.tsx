import { compose, pathOr, includes } from 'ramda'
import React, { FC, Suspense } from 'react'
import { NoSSR } from 'vtex.render-runtime'

const TelemarketingContainer = React.lazy(() => import('./components/TelemarketingContainer'))

const Telemarketing: FC = (props) => {
  if (!hasMyVtex(window)) {
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

const hasMyVtex = compose(includes('myvtex.com'), pathOr('', ['location', 'hostname']))

export default Telemarketing
