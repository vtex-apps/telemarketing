import { compose, path } from 'ramda'
import React, { FC, useState } from 'react'
import { graphql } from 'react-apollo'
import { withSession } from 'vtex.render-runtime'
import sessionQuery from 'vtex.store-resources/QuerySession'

import depersonifyMutation from '../mutations/depersonify.gql'
import impersonateMutation from '../mutations/impersonate.gql'
import isMyVtex from '../utils/isMyVtex'
import processSession from '../utils/processSession'
import Telemarketing from './Telemarketing'

interface Props {
  /** Query with the session */
  session?: Session
  /** Mutation to depersonify */
  depersonify: () => Promise<void>
  /** Mutation to impersonate a customer */
  impersonate: (s: {}) => Promise<void>
  /** Message to display when the email typed has no corresponding user */
  nonexistentUserMessage: string
  /* Prevent page to refresh and show feedback message */
  feedbackForNonexistentUser: boolean 
}

const TelemarketingContainer: FC<Props> = ({ depersonify, impersonate, session, nonexistentUserMessage, feedbackForNonexistentUser }) => {
  const [emailInput, setEmailInput] = useState<string>('')
  const [loadingImpersonate, setloadingImpersonate] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string>('')
  const defaultNonexistentUserMessage = 'There are no users with this email';

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
        if (profile) {
          session.refetch()
          window.location.reload()
        }
        if (!profile && feedbackForNonexistentUser) {
          setFeedback(nonexistentUserMessage || defaultNonexistentUserMessage)
          setloadingImpersonate(false);
        } else {
          window.location.reload()
        }
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
      feedback={feedback}
    />
  )
}

const options = {
  name: 'session',
  skip: () => !isMyVtex(),
  options: () => ({
    ssr: false,
  }),
}

const EnhancedTelemarketing = withSession({ loading: React.Fragment })(
  compose(
    graphql(sessionQuery, options),
    graphql(depersonifyMutation, { name: 'depersonify' }),
    graphql(impersonateMutation, { name: 'impersonate' }),
  )(TelemarketingContainer as any)
)

export default EnhancedTelemarketing

