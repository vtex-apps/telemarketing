import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import { path } from 'ramda'
import {
  orderFormConsumer,
  contextPropTypes,
} from 'vtex.store/OrderFormContext'

import LoginAsCustomer from './components/LoginAsCustomer'
import LogoutCustomerSession from './components/LogoutCustomerSession'
import TelemarketingIcon from './icons/TelemarketingIcon'
import { setCookie, deleteCookie } from './utils/cookies'
import { request } from './utils/request'
import { translate } from './utils/translate'
import { truncateString } from './utils/format-string'
import './global.css'

const IMPERSONATED_CUSTOMER_EMAIL = 'vtex-impersonated-customer-email'

/** The Canonical Telemarketing component impersonates an attendant, with the right permissions, as a client. */
class Telemarketing extends Component {
  static propTypes = {
    /** Intl object*/
    intl: intlShape,
    /** Function to set the ProfileData */
    orderFormContext: contextPropTypes,
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

  setClientProfileData(session) {
    const {
      namespaces: {
        profile: { firstName, lastName, document, phone, email },
      },
    } = session

    const {
      orderFormContext: { orderForm, updateOrderFormProfile },
    } = this.props

    const profileData = {
      email: email && email.value,
      firstName: firstName && firstName.value,
      lastName: lastName && lastName.value,
      document: document && document.value,
      phone: phone && phone.value,
    }

    const variables = {
      orderFormId: orderForm.orderFormId,
      fields: profileData,
    }

    updateOrderFormProfile({ variables })
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

      this.setClientProfileData(session)
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
              loading={loading}
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
      )
    }

    return null
  }
}

export default injectIntl(orderFormConsumer(Telemarketing))
