import React, { useCallback } from 'react'
import { Button, Input } from 'vtex.styleguide'
import { IconAssistantSales, IconProfile } from 'vtex.store-icons'
import translate from '../utils/translate'
import Popover from './Popover'

import styles from '../telemarketing.css'

interface Props {
  /** Current signedin attendant email */
  attendantEmail: string
  /** Input value */
  emailInput: string
  /** Sets the state of the parent component with new email value */
  onInputChange: (s: string) => void
  /** Calls the setSession on the parent component */
  onSetSession: (s: string) => void
  /** Loading status */
  loading: boolean
  /** Intl info */
  intl: any
  /** If is mobile or not */
  mobile: boolean
}

/** Component that shows the email input and calls the setSession function using the Popover component. */
const LoginAsCustomer = (props: Props) => {
  const {
    attendantEmail,
    onInputChange,
    onSetSession,
    loading,
    emailInput,
    intl,
    mobile,
  } = props

  const handleHeaderRendering = useCallback(
    () => (
      <div className="flex items-center c-on-base--inverted">
        <IconProfile />
        <div className="ml2">
          {translate('telemarketing-login.message', intl)}
        </div>
      </div>
    ),
    []
  )

  const handleKeyPress = useCallback(
    (event: any) => {
      event.key === 'Enter' && onSetSession(emailInput)
    },
    [emailInput]
  )

  return (
    <div className={`${styles.login} w-50 flex flex-row-reverse-ns flex-row-s`}>
      <Popover
        arrowClasses="bg-base--inverted"
        renderHeader={handleHeaderRendering}
        mobile={mobile}
      >
        <div className="bg-base--inverted w-100 pa7 c-on-base--inverted">
          <div className={styles.popoverHeaderIcon}>
            <IconAssistantSales size={50} />
          </div>
          <div className={`${styles.popoverHeaderEmail} white-50 mt3`}>
            {attendantEmail}
          </div>
        </div>
        <div className="bg-base w-100 ph5 pb5 pt7">
          <div className={`${styles.loginForm} c-disabled`}>
            <div className={`${styles.loginFormMessage} t-small tl mb3`}>
              {translate('telemarketing-login.message', intl)}
            </div>
            <div className={`${styles.emailInput} mb5`}>
              <Input
                value={emailInput}
                onChange={onInputChange}
                placeholder={'Ex: example@mail.com'}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              size="regular"
              onClick={() => onSetSession(emailInput)}
              isLoading={loading}
            >
              {translate('telemarketing-login.button', intl)}
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default LoginAsCustomer
