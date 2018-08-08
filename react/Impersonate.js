import React, { Component, Fragment } from 'react'
import { Input, Button, Badge } from 'vtex.styleguide'

import { injectIntl, intlShape } from 'react-intl'

import { request, translate } from './utils'
import './global.css'

/** Canonical Impersonate component */
class Impersonate extends Component {
  static propTypes = {
    /** Intl object*/
    intl: intlShape,
  }

  state = {
    canImpersonate: false,
    email: '',
    loading: false,
    sessionToken: '',
  }

  handleLoadSession = session => {
    const {
      namespaces: {
        impersonate: { canImpersonate: value },
      },
    } = session

    value &&
      request('/api/sessions', {
        method: 'POST',
      }).then(() => {
        this.setState({ canImpersonate: value })
      })
  }

  handleInputChange = event => {
    this.setState({ email: event.target.value })
  }

  handleSetSesssion = email => {
    const params = {
      'vtex-impersonated-customer-email': {
        value: email,
      },
    }

    this.setState({ loading: true })

    request('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({
        public: params,
      }),
    }).then(
      res => {
        console.log('res set session', res)
        this.setState({ sessionToken: res.sessionToken, loading: false })
      },
      () => {
        this.setState({ loading: false })
      }
    )
  }

  componentDidMount() {
    request('/api/sessions?items=*').then(res => this.handleLoadSession(res))
  }

  render() {
    const { intl } = this.props
    const { canImpersonate, email, sessionToken, loading } = this.state

    const isLogged = sessionToken !== ''

    if (canImpersonate) {
      return (
        <div className="vtex-impersonate gray">
          {isLogged ? (
            <Fragment>
              <span className="vtex-impersonate__message mr3">
                <span className="mr3">
                  {translate('impersonated.message', intl)}:
                </span>
                <Badge bgColor="#E3E4E6" color="#979899">
                  {email}
                </Badge>
              </span>
              <Button
                size="small"
                onClick={() => this.handleSetSesssion('')}
                isLoading={loading}
              >
                {translate('impersonout.button', intl)}
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <span className="vtex-impersonate__email-input w-50 w-25-l mr3">
                <Input
                  value={email}
                  onChange={this.handleInputChange}
                  placeholder={'Ex: example@mail.com'}
                />
              </span>
              <Button
                size="small"
                onClick={() => this.handleSetSesssion(email)}
                isLoading={loading}
              >
                {translate('impersonate.button', intl)}
              </Button>
            </Fragment>
          )}
        </div>
      )
    }

    return <span />
  }
}

export default injectIntl(Impersonate)
