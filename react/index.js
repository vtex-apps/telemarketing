import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql, compose } from 'react-apollo'

import {
  orderFormConsumer,
  contextPropTypes,
} from 'vtex.store/OrderFormContext'
import { withSession } from 'render'

import requestWithRetry from './utils/request'
import processSession from './utils/processSession'
import depersonifyMutation from './mutations/depersonify.gql'
import impersonateMutation from './mutations/impersonate.gql'

import getSessionQuery from './queries/getSession.gql'

import { clientPropTypes } from './utils/propTypes'

import './global.css'

/** The Canonical Telemarketing component impersonates an attendant, with the right permissions, as a client. */
class Telemarketing extends Component {
  static propTypes = {
    /** Intl object */
    intl: intlShape,
    /** Function to set the ProfileData */
    orderFormContext: contextPropTypes,
    /** Query with the session */
    session: clientPropTypes.isRequired,
    /** Mutation to depersonify */
    depersonify: PropTypes.func.isRequired,
    /** Mutation to impersonate a customer */
    impersonate: PropTypes.func.isRequired,
  }

  state = {
    client: null,
    loading: false,
    emailInput: '',
    attendantEmail: '',
    canImpersonate: false,
    isLoadingSession: true,
  }

  static getDerivedStateFromProps(props, state) {
    const shouldProcessSession = state.isLoadingSession && props.session.loading
    let resultantState = state

    if (shouldProcessSession) {
      resultantState = processSession(props.session.getSession)
    }

    resultantState.isLoadingSession = props.session.loading

    return resultantState
  }

  handleInputChange = event => {
    this.setState({ emailInput: event.target.value })
  }

  handleDepersonify = () => {
    const { orderFormContext, depersonify } = this.props
    const variables = {
      orderFormId: orderFormContext.orderForm.orderFormId,
    }

    this.setState({ loading: true })

    requestWithRetry(depersonify, { variables })
      .then(res => {
        if (res.data.depersonify) {
          this.setState({
            client: null,
          })
        }
        this.setState({ loading: false })
      })
      .catch(err => {
        console.error(err)
        this.setState({ loading: false })
      })
  }

  handleSetSesssion = email => {
    const { orderFormContext, impersonate } = this.props
    const variables = {
      orderFormId: orderFormContext.orderForm.orderFormId,
      email,
    }

    this.setState({ loading: true })

    requestWithRetry(impersonate, { variables })
      .then(res => {
        const processedState = processSession(res.data.impersonate)
        this.setState({ loading: false, ...processedState })
      })
      .catch(e => {
        console.error(e)
        this.setState({ loading: false })
      })
  }

  render() {
    const { intl } = this.props
    const {
      client,
      loading,
      emailInput,
      canImpersonate,
      attendantEmail,
    } = this.state

    return canImpersonate ? (
      <Telemarketing
        intl={intl}
        client={client}
        loading={loading}
        emailInput={emailInput}
        attendantEmail={attendantEmail}
      />
    ) : null
  }
}

const options = {
  name: 'session',
  options: () => ({
    ssr: false,
  }),
}

export default compose(
  injectIntl,
  withSession,
  orderFormConsumer,
  graphql(getSessionQuery, options),
  graphql(depersonifyMutation, { name: 'depersonify' }),
  graphql(impersonateMutation, { name: 'impersonate' })
)(Telemarketing)
