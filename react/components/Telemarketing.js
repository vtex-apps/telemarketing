import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'
import { withRuntimeContext } from 'render'

import LoginAsCustomer from './LoginAsCustomer'
import LogoutCustomerSession from './LogoutCustomerSession'
import TelemarketingIcon from '../icons/TelemarketingIcon'

import translate from '../utils/translate'
import { clientPropTypes } from '../utils/propTypes'

/** Telemarketing render component */
class Telemarketing extends Component {
  render() {
    const {
      intl,
      client,
      loading,
      emailInput,
      onInputChange,
      onSetSession,
      onDepersonify,
      attendantEmail,
      runtime: { hints: { mobile } }
    } = this.props

    const isLogged = client

    return (
      <div
        className={`vtex-telemarketing tc white h2 flex justify-between w-100 f7 ${
          isLogged ? 'bg-red' : 'bg-black-90'
          } z-999 pa2`}
      >
        <div className="flex items-center">
          <TelemarketingIcon />

          {!mobile && (
            <div className="ml2">
              {translate('telemarketing.attendant', intl)}
              <b>{`: ${attendantEmail}`}</b>
            </div>
          )}
        </div>
        {isLogged ? (
          <LogoutCustomerSession
            intl={intl}
            client={client}
            loading={loading}
            onDepersonify={onDepersonify}
            attendantEmail={attendantEmail}
          />
        ) : (
            <LoginAsCustomer
              intl={intl}
              loading={loading}
              emailInput={emailInput}
              onInputChange={onInputChange}
              onSetSession={onSetSession}
              attendantEmail={attendantEmail}
            />
          )}
      </div>
    )
  }
}

Telemarketing.propTypes = {
  /** Intl object */
  intl: intlShape.isRequired,
  /** Impersonated customer info */
  client: clientPropTypes,
  /** Loading status */
  loading: PropTypes.bool.isRequired,
  /** Email input value */
  emailInput: PropTypes.string.isRequired,
  /** Attendant email */
  attendantEmail: PropTypes.string.isRequired,
  /** Function to set the session */
  onSetSession: PropTypes.func.isRequired,
  /** Function to set the emailInput value */
  onInputChange: PropTypes.func.isRequired,
  /** Function to depersonify the impersonated customer */
  onDepersonify: PropTypes.func.isRequired,
}
export default withRuntimeContext(Telemarketing)
