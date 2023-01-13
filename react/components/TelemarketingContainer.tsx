import { compose, path } from 'ramda'
import React, { ChangeEvent, FC, useState } from 'react'
import { graphql } from 'react-apollo'
import { withSession } from 'vtex.render-runtime'
import sessionQuery from 'vtex.store-resources/QuerySession'

import depersonifyMutation from '../mutations/depersonify.gql'
import impersonateMutation from '../mutations/impersonate.gql'
import isMyVtex from '../utils/isMyVtex'
import processSession from '../utils/processSession'
import Telemarketing from './Telemarketing'
import { formatDocument, getUserEmail } from '../utils'

interface Props {
  /** Query with the session */
  session?: Session
  /** Mutation to depersonify */
  depersonify: () => Promise<void>
  /** Mutation to impersonate a customer */
  impersonate: (s: {}) => Promise<void>
}

const TelemarketingContainer: FC<Props> = ({
  depersonify,
  impersonate,
  session,
}) => {
  const [emailInput, setEmailInput] = useState<string>('')
  const [loadingImpersonate, setloadingImpersonate] = useState<boolean>(false)

  const processedSession = processSession(session)

  const maskInput = (value: string) => {
    const strippedValue = value.replace(/[\/.-]/g, '')
    const hasText = !/^\d+$/.test(strippedValue)

    if (hasText) {
      return value
    }

    return formatDocument(strippedValue)
  }

  if (!session || !processedSession || !processedSession.canImpersonate) {
    return null
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => 
    setEmailInput(maskInput(event.target.value))

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

  const handleImpersonate = async (emailOrDocuments: string) => {
    const userEmail = await getUserEmail(emailOrDocuments)

    console.log('useremail', userEmail)

    setloadingImpersonate(true)
    const variables = { userEmail }
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

  console.log('emailinput', emailInput)

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
    graphql(impersonateMutation, { name: 'impersonate' })
  )(TelemarketingContainer as any)
)

export default EnhancedTelemarketing
