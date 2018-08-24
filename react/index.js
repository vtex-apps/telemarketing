import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql, compose } from 'react-apollo'
import { path } from 'ramda'
import {
  orderFormConsumer,
  contextPropTypes,
} from 'vtex.store/OrderFormContext'

import LoginAsCustomer from './components/LoginAsCustomer'
import LogoutCustomerSession from './components/LogoutCustomerSession'
import TelemarketingIcon from './icons/TelemarketingIcon'

import { translate } from './utils/translate'
import requestWithRetry from './utils/request'
import depersonifyMutation from './mutations/depersonify.gql'
import impersonateMutation from './mutations/impersonate.gql'
import initSessionMutation from './mutations/initializeSession.gql'

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
    /** Mutation to initialize the session */
    initializeSession: PropTypes.func.isRequired,
  }

  state = {
    logged: false,
    loading: false,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientDocument: '',
    attendantEmail: '',
    canImpersonate: false,
  }

  componentDidMount = () => {
    requestWithRetry(this.props.initializeSession)
      .then(res => this.processSession(res.data && res.data.initializeSession))
      .catch(err => console.log('err', err))
  }

  processSession = session => {
    const {
      adminUserEmail,
      impersonate: { storeUserId },
      impersonable,
      profile: { document, email, firstName, lastName, phone },
    } = session

    this.setState({
      logged: storeUserId ? true : false,
      canImpersonate: impersonable,
      clientDocument: document,
      clientEmail: email || '',
      clientName: firstName && `${firstName} ${lastName}`,
      clientPhone: phone,
      attendantEmail: adminUserEmail,
    })
  }

  handleInputChange = event => {
    this.setState({ clientEmail: event.target.value })
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
        this.processSession(res.data.impersonate)
        this.setState({ loading: false })
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
          className={`vtex-telemarketing tc white flex justify-between ph4 w-100 f7 ${
            logged ? 'bg-red' : 'bg-black-90'
          } z-999 pa2`}
        >
          <div className="flex align-center">
            <TelemarketingIcon />
            {!isMobile && (
              <div className="pa2">
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
              clientEmail={clientEmail}
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

const componentMutations = compose(
  graphql(depersonifyMutation, { name: 'depersonify' }),
  graphql(impersonateMutation, { name: 'impersonate' }),
  graphql(initSessionMutation, { name: 'initializeSession' })
)(Telemarketing)

export default injectIntl(orderFormConsumer(componentMutations))
