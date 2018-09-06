import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql } from 'react-apollo'
import { compose, path } from 'ramda'
import { withSession } from 'render'

import processSession from './utils/processSession'
import { sessionPropTypes } from './utils/propTypes'

import impersonateMutation from './mutations/impersonate.gql'
import depersonifyMutation from './mutations/depersonify.gql'
import getSessionQuery from './queries/getSession.gql'

import Telemarketing from './components/Telemarketing'


import './global.css'

/** The Canonical Telemarketing component impersonates an attendant, with the right permissions, as a client. */
class TelemarketingContainer extends Component {
  static propTypes = {
    /** Intl object */
    intl: intlShape,
    /** Query with the session */
    session: sessionPropTypes.isRequired,
    /** Mutation to depersonify */
    depersonify: PropTypes.func.isRequired,
    /** Mutation to impersonate a customer */
    impersonate: PropTypes.func.isRequired,
  }

  state = {
    loadingImpersonate: false,
    emailInput: '',
  }

  handleInputChange = event => {
    this.setState({ emailInput: event.target.value })
  }

  handleDepersonify = () => {
    const { depersonify, session } = this.props

    this.setState({ loadingImpersonate: true })

    depersonify()
      .then(res => {
        const depersonify = path(['data', 'depersonify'], res)

        if (depersonify) {
          session.refetch()
        }

        this.setState({ loadingImpersonate: false })
      })
      .catch(err => {
        console.error(err)
        this.setState({ loadingImpersonate: false })
      })
  }

  handleSetSession = email => {
    const { impersonate, session } = this.props
    this.setState({ loadingImpersonate: true })
    const variables = { email }
    impersonate({ variables })
      .then((res) => {
        const profile = path(['data', 'impersonate', 'impersonae', 'profile'], res)

        if (profile)
          session.refetch()

        this.setState({ loadingImpersonate: false })
      })
      .catch(e => {
        console.error(e)
        this.setState({ loadingImpersonate: false })
      })
  }

  render() {
    const { intl, session: { getSession } } = this.props
    const { emailInput, loadingImpersonate } = this.state
    const processedSession = processSession(getSession)

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
}

const options = {
  name: 'session',
  options: () => ({
    ssr: false,
  }),
}

export default withSession()(compose(
  injectIntl,
  graphql(getSessionQuery, options),
  graphql(depersonifyMutation, { name: 'depersonify' }),
  graphql(impersonateMutation, { name: 'impersonate' }),
)(TelemarketingContainer))
