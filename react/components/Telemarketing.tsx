import React, { Fragment, ReactNode } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { Container } from 'vtex.store-components'
import { IconAssistantSales } from 'vtex.dreamstore-icons'
import classnames from 'classnames'
import translate from '../utils/translate'
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
  /** Intl object */
  intl: any
  /** Loading status */
  loading: boolean
  /** Function to depersonify the impersonated customer */
  onDepersonify: () => any
  /** Function to set the emailInput value */
  onInputChange: (s: string) => void
  /** Function to set the session */
  onSetSession: (s: string) => void
  /** Children */
  readonly children?: ReactNode
}

/** Telemarketing render component */
const Telemarketing = (props: Props) => {
  const {
    intl,
    client,
    loading,
    emailInput,
    onInputChange,
    onSetSession,
    onDepersonify,
    attendantEmail,
  } = props

  const {
    hints: { mobile },
  } = useRuntime()

  const containerClasses = classnames(
    styles.container,
    'flex justify-center tc c-on-emphasis h2 t-mini pa2',
    !!client ? 'bg-emphasis' : 'bg-base--inverted'
  )

  return (
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
                {translate('telemarketing.attendant', intl)}
                <span>{`: ${attendantEmail}`}</span>
              </Fragment>
            )}
          </div>
        </div>
        {!!client ? (
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
    </Container>
  )
}

export default Telemarketing
