import React, { Fragment, ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'
import { Container } from 'vtex.store-components'
import { IconAssistantSales } from 'vtex.store-icons'
import classnames from 'classnames'

import LoginAsCustomer from './LoginAsCustomer'
import LogoutCustomerSession from './LogoutCustomerSession'
import styles from '../telemarketing.css'

interface Props {
  /** Attendant email */
  attendantEmail: string
  /** Impersonated customer info */
  client?: Client
  /** Email input value */
  emailInput: string
  /** Loading status */
  loading: boolean
  /** Function to depersonify the impersonated customer */
  onDepersonify: () => any
  /** Function to set the emailInput value */
  onInputChange: (s: string) => void
  /** Function to set the session */
  onSetSession: (s: string) => void
  /** If is mobile or not */
  mobile: boolean
  /** Children */
  readonly children?: ReactNode
}

/** Telemarketing render component */
const Telemarketing = (props: Props) => {
  const {
    client,
    loading,
    emailInput,
    onInputChange,
    onSetSession,
    onDepersonify,
    attendantEmail,
    mobile,
  } = props

  const containerClasses = classnames(
    styles.container,
    'flex justify-center tc h2 t-mini pa2 w-100'
  )

  return (
    <div className={classnames('w-100', styles.wrapper, !!client ? 'bg-emphasis c-on-emphasis' : 'bg-base--inverted c-on-base--inverted')}>
      <Container className={containerClasses}>
        <div className="flex justify-between w-100 mw9">
          <div className="flex pl3 w-50 items-center c-on-base--inverted">
            <IconAssistantSales />
            <div className="ml2">
              {mobile ? (
                <span>
                  {attendantEmail.slice(0, attendantEmail.indexOf('@'))}
                </span>
              ) : (
                <Fragment>
                  <FormattedMessage id="telemarketing.attendant" />
                  <span>{`: ${attendantEmail}`}</span>
                </Fragment>
              )}
            </div>
          </div>
          {!!client ? (
            <LogoutCustomerSession
              client={client}
              loading={loading}
              onDepersonify={onDepersonify}
              attendantEmail={attendantEmail}
              mobile={mobile}
            />
          ) : (
            <LoginAsCustomer
              loading={loading}
              emailInput={emailInput}
              onInputChange={onInputChange}
              onSetSession={onSetSession}
              attendantEmail={attendantEmail}
              mobile={mobile}
            />
          )}
        </div>
      </Container>
    </div>
  )
}

export default Telemarketing
