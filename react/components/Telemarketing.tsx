import { path } from 'ramda'
import React, { Component } from 'react'

import TelemarketingIcon from '../icons/TelemarketingIcon'
import translate from '../utils/translate'
import LoginAsCustomer from './LoginAsCustomer'
import LogoutCustomerSession from './LogoutCustomerSession'

interface Props {
  /** Attendant email */
  attendantEmail: string,
  /** Impersonated customer info */
  client?: Client,
  /** Email input value */
  emailInput: string,
  /** Intl object */
  intl: any,
  /** Loading status */
  loading: boolean,
  /** Function to depersonify the impersonated customer */
  onDepersonify: () => any,
  /** Function to set the emailInput value */
  onInputChange: (s: string) => void,
  /** Function to set the session */
  onSetSession: (s: string) => void,
}

/** Telemarketing render component */
export default class Telemarketing extends Component<Props> {
  public render() {
    const {
      intl,
      client,
      loading,
      emailInput,
      onInputChange,
      onSetSession,
      onDepersonify,
      attendantEmail,
    } = this.props

    const isMobile = path(['__RUNTIME__', 'hints', 'mobile'], global)

    return (
      <div
        className={`vtex-telemarketing tc white h2 flex justify-between w-100 f7 ${
          client ? 'bg-red' : 'bg-black-90'
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
        {client ? (
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
