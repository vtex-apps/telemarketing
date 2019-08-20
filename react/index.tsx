import React, { useState, FC } from 'react'
import { compose, path, pathOr, includes } from 'ramda'
import { graphql } from 'react-apollo'
import { IntlShape } from 'react-intl'
import { withSession } from 'vtex.render-runtime'
import { Queries } from 'vtex.store-resources'

import { withTelemarketingStateProvider, useTelemarketingDispatch, ErrorCode } from './components/StateProvider'
import Telemarketing from './components/Telemarketing'
import depersonifyMutation from './mutations/depersonify.gql'
import impersonateMutation from './mutations/impersonate.gql'
import processSession from './utils/processSession'

interface Props {
  intl: IntlShape
  /** Query with the session */
  session?: Session
  /** Mutation to depersonify */
  depersonify: () => Promise<void>
  /** Mutation to impersonate a customer */
  impersonate: (s: {}) => Promise<void>
}

const TelemarketingContainer: FC<Props> = ({ depersonify, impersonate, session }: Props) => {
  const dispatch = useTelemarketingDispatch()
  const processedSession = processSession(session)

  const handleDepersonify = () => {
    dispatch({ type: 'SET_LOADING', loading: true })
    depersonify()
      .then(response => {
        const depersonifyData = path(['data', 'depersonify'], response)
        !!depersonifyData && session.refetch()
        window.location.reload()
      })
      .catch(() => {
        dispatch({ type: 'SET_LOADING', loading: false })
      })
  }

  const handleImpersonate = (email: string) => {
    dispatch({ type: 'SET_LOADING', loading: true })
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
          return
        }

        dispatch({ type: 'ERROR', code: ErrorCode.USER_NOT_REGISTERED })
      })
      .catch((error) => {
        const badUserInput = path(['graphQLErrors', 0, 'originalError', 'code'], error) === 'BAD_USER_INPUT'
        if (badUserInput) {
          dispatch({ type: 'ERROR', code: ErrorCode.BAD_USER_INPUT })
        } else {
          dispatch({ type: 'SET_LOADING', loading: false })
        }
      })
  }

  if (!session || !processedSession || !processedSession.canImpersonate) {
    return null
  }

  const { client, attendantEmail } = processedSession

  return (
    <Telemarketing
      client={client}
      attendantEmail={attendantEmail}
      onImpersonate={handleImpersonate}
      onDepersonify={handleDepersonify}
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
<<<<<<< HEAD
=======
    injectIntl as any,
    withTelemarketingStateProvider,
>>>>>>> Handle user not registered and invalid email errors
    graphql(Queries.session, options),
    graphql(depersonifyMutation, { name: 'depersonify' }),
    graphql(impersonateMutation, { name: 'impersonate' }),
  )(TelemarketingContainer as any)
)

export default EnhancedTelemarketing
