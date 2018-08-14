import React, { Component } from 'react'

import { injectIntl, intlShape } from 'react-intl'

import TelemarketingLogin from './components/TelemarketingLogin'
import TelemarketingLogout from './components/TelemarketingLogout'
import AttendantIcon from './icons/AttendantIcon'
import { setCookie, deleteCookie } from './utils/cookies'
import { request } from './utils/request'
import { translate } from './utils/translate'
import './global.css'

const IMPERSONATED_CUSTOMER_EMAIL = 'vtex-impersonated-customer-email'

/** Canonical Telemarketing component */
class Telemarketing extends Component {
  static propTypes = {
    /** Intl object*/
    intl: intlShape,
  }

  state = {
    canImpersonate: false,
    clientName: '',
    clientEmail: '',
    loading: false,
    firstName: '',
    lastName: '',
    attendantName: 'Ana Beatriz',
    attendantEmail: 'anabeatriz@mail.com',
    logged: false,
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
      },
    } = session

    const canImp = value === 'true'

    if (isAuthenticated.value === 'False') {
      this.setState({
        clientEmail: '',
        firstName: '',
        lastName: '',
        logged: false,
        canImpersonate: canImp,
      })
    } else {
      this.setState({
        canImpersonate: canImp,
        clientEmail: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
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
      attendantName,
      attendantEmail,
      logged,
    } = this.state

    if (canImpersonate) {
      return (
        <div
          className={`vtex-telemarketing white flex items-end w-100 justify-end ${
            logged ? 'bg-red' : 'bg-black-90'
          } z-999 pa3`}
        >
          <div className="flex align-center">
            <AttendantIcon />
            <div className="pa3">
              {translate('telemarketing.attendant', intl)}: {attendantName}
            </div>
          </div>
          <div className="mh9">
            {logged ? (
              <TelemarketingLogout
                intl={intl}
                clientName={clientName}
                clientEmail={clientEmail}
                attendantName={attendantName}
                attendantEmail={attendantEmail}
                onSetSesssion={this.handleSetSesssion}
              />
            ) : (
              <TelemarketingLogin
                intl={intl}
                clientEmail={clientEmail}
                loading={loading}
                attendantName={attendantName}
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
