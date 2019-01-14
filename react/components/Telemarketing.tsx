import { path } from 'ramda'
import React, { Component, Fragment, ReactNode } from 'react'
import { withRuntimeContext } from 'render'

import Icon from 'vtex.use-svg/Icon'
import { Container } from 'vtex.store-components'
import translate from '../utils/translate'
import LoginAsCustomer from './LoginAsCustomer'
import LogoutCustomerSession from './LogoutCustomerSession'

import telemarketing from '../telemarketing.css'

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
      <Container className={`${telemarketing.container} flex justify-center tc c-on-emphasis h2 t-mini ${
        client ? 'bg-emphasis' : 'bg-base--inverted'
        } pa2`}
      >
        <div className="flex justify-between w-100 mw9">
          <div className="flex items-center">
            <Icon id="hpa-telemarketing" size={25} className="white" />
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
      </Container >
    )
  }
}

export default withRuntimeContext(Telemarketing)