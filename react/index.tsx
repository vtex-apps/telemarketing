import { compose, path, pathOr, includes } from 'ramda'
import React, { useState, FC } from 'react'
import { graphql } from 'react-apollo'
import { withSession } from 'vtex.render-runtime'
import { Queries } from 'vtex.store-resources'

import Telemarketing from './components/Telemarketing'
import depersonifyMutation from './mutations/depersonify.gql'
import impersonateMutation from './mutations/impersonate.gql'
import processSession from './utils/processSession'

interface Props {
  /** Query with the session */
  session?: Session
  /** Mutation to depersonify */
  depersonify: () => Promise<void>
  /** Mutation to impersonate a customer */
  impersonate: (s: {}) => Promise<void>
}

const TelemarketingContainer: FC<Props> = ({ depersonify, impersonate, session }) => {
  const [emailInput, setEmailInput] = useState<string>('')
  const [loadingImpersonate, setloadingImpersonate] = useState<boolean>(false)

  const processedSession = processSession(session)

  if (!session || !processedSession || !processedSession.canImpersonate) {
    return null
  }

  const handleInputChange = (event: any) => {
    setEmailInput(event.target.value)
  }

  const handleDepersonify = () => {
    setloadingImpersonate(true)
    depersonify()
      .then(response => {
        const depersonifyData = path(['data', 'depersonify'], response)
        !!depersonifyData && session.refetch()
        window.location.reload()
      })
      .catch(() => setloadingImpersonate(false))
  }

  const handleImpersonate = (email: string) => {
    setloadingImpersonate(true)
    const variables = { email }
    impersonate({ variables })
      .then(response => {
        const profile = path(
          ['data', 'impersonate', 'impersonate', 'profile'],
          response
        )
        !!profile && session.refetch()
        window.location.reload()
      })
      .catch(() => setloadingImpersonate(false))
  }

  const { client, attendantEmail } = processedSession

  return (
    <Telemarketing
      client={client}
      loading={loadingImpersonate}
      emailInput={emailInput}
      attendantEmail={attendantEmail}
      onImpersonate={handleImpersonate}
      onDepersonify={handleDepersonify}
      onInputChange={handleInputChange}
    />
  )
}

const hasMyVtex = compose(includes('myvtex.com'), pathOr('', ['location', 'hostname']))

const options = {
  name: 'session',
  skip: () => !hasMyVtex(window),
  options: () => ({
    ssr: false,
  }),
}

const EnhancedTelemarketing = withSession({ loading: React.Fragment })(
  compose(
    graphql(Queries.session, options),
    graphql(depersonifyMutation, { name: 'depersonify' }),
    graphql(impersonateMutation, { name: 'impersonate' }),
  )(TelemarketingContainer as any)
)

export default EnhancedTelemarketing
