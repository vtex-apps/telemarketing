import React, { Component } from 'react'

import { injectIntl, intlShape } from 'react-intl'

import LoginAsCustomer from './components/LoginAsCustomer'
import LogoutCustomerSession from './components/LogoutCustomerSession'
import TelemarketingIcon from './icons/TelemarketingIcon'
import { setCookie, deleteCookie } from './utils/cookies'
import { request } from './utils/request'
import { translate } from './utils/translate'
import { truncateString } from './utils/format-string'
import './global.css'

const IMPERSONATED_CUSTOMER_EMAIL = 'vtex-impersonated-customer-email'

/** Canonical Telemarketing component that receives an client email and impersonates that client if the attendant has the correct permission for it. */
class Telemarketing extends Component {
  static propTypes = {
    /** Intl object*/
    intl: intlShape,
  }

  state = {
    logged: false,
    loading: false,
    clientName: '',
    clientEmail: '',
    attendantEmail: '',
    canImpersonate: false,
  }

  componentDidMount = () => {
    request('/api/sessions', { method: 'POST' }).then(() => {
      request('/api/sessions?items=*')
        .then(res => {
          this.processSession(res)
        })
        .catch(err => console.log('Error initializing session', err))
    })
  }

  processSession = session => {
    const {
      namespaces: {
        impersonate: {
          canImpersonate: { value },
        },
        profile: { isAuthenticated, email, firstName, lastName },
        authentication: { adminUserEmail },
      },
    } = session

    const canImp = value === 'true'

    if (isAuthenticated.value === 'False') {
      this.setState({
        clientName: '',
        clientEmail: '',
        logged: false,
        canImpersonate: canImp,
        attendantEmail: adminUserEmail ? adminUserEmail.value : '',
      })
    } else {
      this.setState({
        canImpersonate: canImp,
        attendantEmail: adminUserEmail.value,
        clientName: `${firstName.value} ${lastName.value}`,
        clientEmail: email.value,
        logged: true,
      })
    }
  }

  handleInputChange = event => {
    this.setState({ clientEmail: event.target.value })
  }

  handleSetSesssion = email => {
    const params = {
      'vtex-impersonated-customer-email': {
        value: email,
      },
    }

    this.setState({ loading: true })

    if (email === '') deleteCookie(IMPERSONATED_CUSTOMER_EMAIL)
    else setCookie(IMPERSONATED_CUSTOMER_EMAIL, email, 1)

    request('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({
        public: params,
      }),
    })
      .then(() => {
        request('/api/sessions?items=*').then(session =>
          this.processSession(session)
        )
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    const { intl } = this.props
    const {
      canImpersonate,
      clientEmail,
      clientName,
      loading,
      attendantEmail,
      logged,
    } = this.state

    if (canImpersonate) {
      return (
        <div
          className={`vtex-telemarketing white flex items-end w-100 justify-end f6 ${
            logged ? 'bg-red' : 'bg-black-90'
          } z-999 pa2`}
        >
          <div className="flex align-center">
            <TelemarketingIcon />
            <div className="pa3">
              {translate('telemarketing.attendant', intl)}
              <b>{`: ${truncateString(attendantEmail)}`}</b>
            </div>
          </div>
          <div className="mh10">
            {logged ? (
              <LogoutCustomerSession
                intl={intl}
                clientName={clientName}
                clientEmail={clientEmail}
                attendantEmail={attendantEmail}
                onSetSesssion={this.handleSetSesssion}
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
        </div>
      )
    }

    return null
  }
}

export default injectIntl(Telemarketing)
