import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { path } from 'ramda'
import {
  orderFormConsumer,
  contextPropTypes,
} from 'vtex.store/OrderFormContext'
import { withSession } from 'render'

import LoginAsCustomer from './components/LoginAsCustomer'
import LogoutCustomerSession from './components/LogoutCustomerSession'
import TelemarketingIcon from './icons/TelemarketingIcon'

import translate from './utils/translate'
import requestWithRetry from './utils/request'
import processSession from './utils/processSession'
import depersonifyMutation from './mutations/depersonify.gql'
import impersonateMutation from './mutations/impersonate.gql'

import getSessionQuery from './queries/getSession.gql'

import './global.css'

/** The Canonical Telemarketing component impersonates an attendant, with the right permissions, as a client. */
class Telemarketing extends Component {
  static propTypes = {
    /** Intl object */
    intl: intlShape,
    /** Function to set the ProfileData */
    orderFormContext: contextPropTypes,
    /** Mutation to depersonify */
    depersonify: PropTypes.func.isRequired,
    /** Mutation to impersonate a customer */
    impersonate: PropTypes.func.isRequired,
    /** Query with the session */
    session: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getSession: PropTypes.shape({
        adminUserEmail: PropTypes.string.isRequired,
        adminUserId: PropTypes.string.isRequired,
        impersonable: PropTypes.bool.isRequired,
        profile: PropTypes.shape({
          document: PropTypes.string,
          phone: PropTypes.string,
          firstName: PropTypes.string,
          lastName: PropTypes.string,
        }),
        impersonate: PropTypes.shape({
          storeUserId: PropTypes.string,
          storeUserEmail: PropTypes.string,
        }),
      }),
    }).isRequired,
  }

  state = {
    logged: false,
    loading: false,
    clientName: '',
    clientEmail: '',
    emailInput: '',
    clientPhone: '',
    clientDocument: '',
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
            logged: false,
            clientDocument: '',
            clientEmail: '',
            clientName: '',
            clientPhone: '',
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
      canImpersonate,
      clientEmail,
      emailInput,
      clientName,
      clientDocument,
      clientPhone,
      loading,
      attendantEmail,
      logged,
    } = this.state

    const isMobile = path(['__RUNTIME__', 'hints', 'mobile'], global)

    if (canImpersonate) {
      return (
        <div
          className={`vtex-telemarketing tc white h2 flex justify-between w-100 f7 ${
            logged ? 'bg-red' : 'bg-black-90'
          } z-999 pa2`}
        >
          <div className="flex items-center">
            <TelemarketingIcon />

            {!isMobile && (
              <div className="ml2">
                {translate('telemarketing.attendant', intl)}
                <b>{`: ${attendantEmail}`}</b>
              </div>
            )}
          </div>
          {logged ? (
            <LogoutCustomerSession
              intl={intl}
              clientName={clientName}
              clientEmail={clientEmail}
              clientPhone={clientPhone}
              clientDocument={clientDocument}
              loading={loading}
              attendantEmail={attendantEmail}
              onDepersonify={this.handleDepersonify}
            />
          ) : (
            <LoginAsCustomer
              intl={intl}
              emailInput={emailInput}
              loading={loading}
              attendantEmail={attendantEmail}
              onSetSesssion={this.handleSetSesssion}
              onInputChange={this.handleInputChange}
            />
          )}
        </div>
      )
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

export default compose(
  withSession,
  graphql(depersonifyMutation, { name: 'depersonify' }),
  graphql(impersonateMutation, { name: 'impersonate' }),
  graphql(getSessionQuery, options),
  orderFormConsumer,
  injectIntl
)(Telemarketing)
