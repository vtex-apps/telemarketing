import { compose, path } from 'ramda'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl } from 'react-intl'
import { withSession } from 'render'
import { session } from 'vtex.store-resources'

import processSession from './utils/processSession'

import depersonifyMutation from './mutations/depersonify.gql'
import impersonateMutation from './mutations/impersonate.gql'

import Telemarketing from './components/Telemarketing'

interface Props {
  /** Intl object */
  intl: any,
  /** Query with the session */
  session: Session,
  /** Mutation to depersonify */
  depersonify: () => Promise<void>,
  /** Mutation to impersonate a customer */
  impersonate: (s: {}) => Promise<void>,
}

interface State {
  loadingImpersonate: boolean,
  emailInput: string
}

/** The Canonical Telemarketing component impersonates an attendant, with the right permissions, as a client. */
class TelemarketingContainer extends Component<Props, State> {
  public state = {
    emailInput: '',
    loadingImpersonate: false,
  }

  public render() {
    const { intl, session } = this.props
    const { emailInput, loadingImpersonate } = this.state
    const processedSession = processSession(session)

    if (processedSession) {
      const {
        client,
        canImpersonate,
        attendantEmail,
      } = processedSession

      return canImpersonate ? (
        <Telemarketing
          intl={intl}
          client={client}
          loading={loadingImpersonate}
          emailInput={emailInput}
          attendantEmail={attendantEmail}
          onSetSession={this.handleSetSession}
          onDepersonify={this.handleDepersonify}
          onInputChange={this.handleInputChange}
        />
      ) : null
    }

    return null
  }

  private handleInputChange = (event: any) => {
    this.setState({ emailInput: event.target.value })
  }

  private handleDepersonify = () => {
    const { depersonify, session } = this.props

    this.setState({ loadingImpersonate: true })

    depersonify()
      .then(response => {
        console.log('depers', response)
        const depersonifyData = path(['data', 'depersonify'], response)

        if (depersonifyData) {
          session.refetch()
        }

        this.setState({ loadingImpersonate: false, emailInput: '' })
      })
      .catch(error => {
        console.error(error)
        this.setState({ loadingImpersonate: false })
      })
  }

  private handleSetSession = (email: string) => {
    const { impersonate, session } = this.props
    this.setState({ loadingImpersonate: true })
    const variables = { email }
    impersonate({ variables })
      .then((response) => {
        const profile = path(['data', 'impersonate', 'impersonate', 'profile'], response)

        if (profile) {
          session.refetch()
        }

        this.setState({ loadingImpersonate: false })
      })
      .catch(error => {
        console.error(error)
        this.setState({ loadingImpersonate: false })
      })
  }
}

const options = {
  name: 'session',
  options: () => ({
    ssr: false,
  }),
}

export default withSession({ loading: React.Fragment })(compose(
  injectIntl,
  graphql(session, options),
  graphql(depersonifyMutation, { name: 'depersonify' }),
  graphql(impersonateMutation, { name: 'impersonate' }),
)(TelemarketingContainer))
