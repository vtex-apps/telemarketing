import React, { useCallback } from 'react'
import { Button, Input } from 'vtex.styleguide'
import { IconAssistantSales, IconProfile } from 'vtex.dreamstore-icons'
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
  } = props

  const handleHeaderRendering = useCallback(
    () => (
      <div className="flex items-center">
        <IconProfile className="white" />
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
    <div className={`${styles.login}`}>
      <Popover
        arrowClasses="bg-base--inverted"
        renderHeader={handleHeaderRendering}
      >
        <div className="bg-base--inverted w-100 pa4">
          <div className={`${styles.popoverHeaderIcon}`}>
            <IconAssistantSales size={50} activeClassName="white" />
          </div>
          <div
            className={`${
              styles.popoverHeaderEmail
            } white-50 mt3 c-on-base--inverted`}
          >
            {attendantEmail}
          </div>
        </div>
        <div className="bg-base w-100 pa4">
          <div className={`${styles.loginForm} c-disabled`}>
            <div className={`${styles.loginFormMessage} tl mv3`}>
              {translate('telemarketing-login.message', intl)}
            </div>
            <div className={`${styles.emailInput} mv3`}>
              <Input
                value={emailInput}
                onChange={onInputChange}
                placeholder={'Ex: example@mail.com'}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              size="small"
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
