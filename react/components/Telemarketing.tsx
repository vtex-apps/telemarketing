import { path } from 'ramda'
import React, { Component, Fragment, ReactNode } from 'react'
import { withRuntimeContext } from 'render'

import Icon from 'vtex.use-svg/Icon'
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
  /** Children */
  readonly children?: ReactNode,
}

/** Telemarketing render component */
export class Telemarketing extends Component<Props> {
  public render() {
    const {
      intl,
      client,
      loading,
      emailInput,
      onInputChange,
      onSetSession,
      onDepersonify,
      attendantEmail
    } = this.props

    const mobile = path(['__RUNTIME__', 'hints', 'mobile'], global)
    const isLogged = client

    return (
      <div className={`vtex-telemarketing force-full-width ph3 ph5-m ph8-l ph9-xl  tc white h2 flex justify-between w-100 f7 ${
          client ? 'bg-red' : 'bg-black-90'
          } z-999 pa2`}
      >
        <div className="pl4 flex items-center w-50">
          <Icon id="telemarketing" size={20} viewBox="0 0 21 21" />
          <div className="ml2">
            {mobile ? (
                <b>{attendantEmail.slice(0, attendantEmail.indexOf('@'))}</b>
              ) : (
                <Fragment>
                  {translate('telemarketing.attendant', intl)}
                  <b>{`: ${attendantEmail}`}</b>
                </Fragment>
            )}
          </div>
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

export default withRuntimeContext(Telemarketing)