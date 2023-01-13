import classnames from 'classnames'
import React, { ChangeEvent, ReactNode } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import useDevice from 'vtex.device-detector/useDevice'
import { Container } from 'vtex.store-components'
import { IconAssistantSales } from 'vtex.store-icons'

import { FormattedMessage } from 'react-intl'
import styles from '../telemarketing.css'
import LoginAsCustomer from './LoginAsCustomer'
import LogoutCustomerSession from './LogoutCustomerSession'

const CSS_HANDLES = [
  'wrapper',
  'telemarketingBar',
  'attendantContainer',
  'attendantEmail',
] as const
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
  onInputChange: (s: ChangeEvent<HTMLInputElement>) => void
  /** Function to impersonate */
  onImpersonate: (s: string) => void
  /** Children */
  readonly children?: ReactNode
}

/** Telemarketing render component */
const Telemarketing = ({
  client,
  loading,
  emailInput,
  onInputChange,
  onImpersonate,
  onDepersonify,
  attendantEmail,
}: Props) => {
  const { isMobile } = useDevice()
  const handles = useCssHandles(CSS_HANDLES)

  const containerClasses = classnames(
    styles.container,
    'flex justify-center tc h2 t-mini pa2 w-100'
  )

  return (
    <div
      className={classnames(
        'w-100',
        handles.wrapper,
        !!client
          ? 'bg-emphasis c-on-emphasis'
          : 'bg-base--inverted c-on-base--inverted'
      )}
    >
      <Container className={containerClasses}>
        <div className={`${handles.telemarketingBar} flex justify-between w-100 mw9`}>
          <div className={`${handles.attendantContainer} flex pl3 w-50 items-center c-on-base--inverted`}>
            <IconAssistantSales />
            <div className={`${handles.attendantEmail} ml2`}>
              {isMobile ? (
                <span>
                  {attendantEmail.slice(0, attendantEmail.indexOf('@'))}
                </span>
              ) : (
                <FormattedMessage
                  id="store/telemarketing.attendant"
                  values={{ attendant: attendantEmail }}
                />
              )}
            </div>
          </div>
          {!!client ? (
            <LogoutCustomerSession
              client={client}
              loading={loading}
              onDepersonify={onDepersonify}
              attendantEmail={attendantEmail}
              mobile={isMobile}
            />
          ) : (
            <LoginAsCustomer
              loading={loading}
              emailInput={emailInput}
              onInputChange={onInputChange}
              onImpersonate={onImpersonate}
              attendantEmail={attendantEmail}
              mobile={isMobile}
            />
          )}
        </div>
      </Container>
    </div>
  )
}

export default Telemarketing
