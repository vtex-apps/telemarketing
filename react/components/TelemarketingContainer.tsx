import { compose, path } from 'ramda'
import React, { FC, useState } from 'react'
import { graphql } from 'react-apollo'
import { withSession } from 'vtex.render-runtime'
import sessionQuery from 'vtex.store-resources/QuerySession'

import createUserMutation from '../graphql/mutations/createUser.gql'
import depersonifyMutation from '../graphql/mutations/depersonify.gql'
import impersonateMutation from '../graphql/mutations/impersonate.gql'
import searchUserQuery from '../graphql/queries/searchUser.gql'
import isMyVtex from '../utils/isMyVtex'
import processSession from '../utils/processSession'
import useImperativeQuery from '../hooks/useImperativeQuery'
import Telemarketing from './Telemarketing'

interface Props {
  /** Query with the session */
  session?: Session
  /** Mutation to depersonify */
  depersonify: () => Promise<void>
  /** Mutation to impersonate a customer */
  impersonate: (s: {}) => Promise<void>
  /** Mutation to create a user if not exists */
  createUser: (s: {}) => Promise<any>
}

const TelemarketingContainer: FC<Props> = ({ 
  depersonify, 
  impersonate, 
  createUser,
  session 
}) => {
  const [emailInput, setEmailInput] = useState<string>('')
  const [loadingImpersonate, setloadingImpersonate] = useState<boolean>(false)

  const processedSession = processSession(session)
  const query = useImperativeQuery(searchUserQuery, {
    variables: {
      acronym: 'CL',
      where: `email=${emailInput}`
    }
  })
  
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

  const handleCreateUser = (email: string) => {
    return createUser({ variables: { 
      acronym: 'CL',
      document: {
        fields: [
          { key: 'email', value: email }
        ]
    }}})
  }

  const doImpersonate = (email: string) => {
    const variables = { email }
    
    impersonate({ variables }).then(response => {
      const profile = path(
        ['data', 'impersonate', 'impersonate', 'profile'],
        response
      )
      !!profile && session.refetch()
      window.location.reload()
    }).catch(() => setloadingImpersonate(false))
  }

  const handleImpersonate = async (email: string) => {
    setloadingImpersonate(true)
    const{ data } = await query()
    
    if (!data?.documents?.length) {
      handleCreateUser(email)
        .then((response) => {
          const userCreated = path(
            ['data', 'createDocument', 'id'],
            response
          )
          
          if (userCreated) doImpersonate(email)
        })
        .catch((error) => console.log(error))
    } else {
      doImpersonate(email)
    }
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
    graphql(createUserMutation, { name: 'createUser' }),
  )(TelemarketingContainer as any)
)

export default EnhancedTelemarketing

