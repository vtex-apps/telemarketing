import { compose, path } from 'ramda'
import React, { useState, useCallback } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl } from 'react-intl'
import { withSession } from 'vtex.render-runtime'
import { Queries } from 'vtex.store-resources'

import Telemarketing from './components/Telemarketing'
import depersonifyMutation from './mutations/depersonify.gql'
import impersonateMutation from './mutations/impersonate.gql'
import processSession from './utils/processSession'
import { useMedia, presets } from './hooks/useMedia'

interface Props {
  /** Intl object */
  intl: any
  /** Query with the session */
  session: Session
  /** Mutation to depersonify */
  depersonify: () => Promise<void>
  /** Mutation to impersonate a customer */
  impersonate: (s: {}) => Promise<void>
}

const TelemarketingContainer = (props: Props) => {
  const [emailInput, setEmailInput] = useState<string>('')
  const [loadingImpersonate, setloadingImpersonate] = useState<boolean>(false)
  const mobile = useMedia(presets.mobile)

  const { intl, session } = props
  const processedSession = processSession(session)

  const handleInputChange = useCallback(
    (event: any) => {
      setEmailInput(event.target.value)
    },
    [event]
  )

  const handleDepersonify = useCallback(() => {
    const { depersonify, session } = props
    setloadingImpersonate(true)
    depersonify()
      .then(response => {
        const depersonifyData = path(['data', 'depersonify'], response)
        !!depersonifyData && session.refetch()
        setloadingImpersonate(false)
        setEmailInput('')
      })
      .catch(() => setloadingImpersonate(false))
  }, [])

  const handleSetSession = useCallback((email: string) => {
    const { impersonate, session } = props
    setloadingImpersonate(true)
    const variables = { email }
    impersonate({ variables })
      .then(response => {
        const profile = path(
          ['data', 'impersonate', 'impersonate', 'profile'],
          response
        )
        !!profile && session.refetch()
        setloadingImpersonate(false)
      })
      .catch(() => setloadingImpersonate(false))
  }, [])

  if (processedSession) {
    const { client, canImpersonate, attendantEmail } = processedSession
    return canImpersonate ? (
      <Telemarketing
        intl={intl}
        client={client}
        loading={loadingImpersonate}
        emailInput={emailInput}
        attendantEmail={attendantEmail}
        onSetSession={handleSetSession}
        onDepersonify={handleDepersonify}
        onInputChange={handleInputChange}
        mobile={mobile}
      />
    ) : null
  }

  return null
}

const options = {
  name: 'session',
  options: () => ({
    ssr: false,
  }),
}

export default withSession({ loading: React.Fragment })(
  compose(
    injectIntl as any,
    graphql(Queries.session, options),
    graphql(depersonifyMutation, { name: 'depersonify' }),
    graphql(impersonateMutation, { name: 'impersonate' })
  )(TelemarketingContainer as any)
)
