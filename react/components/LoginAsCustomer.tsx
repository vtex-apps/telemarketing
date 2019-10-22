import React, { useCallback } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps, defineMessages } from 'react-intl'
import { Button, Input } from 'vtex.styleguide'
import { IconAssistantSales, IconProfile } from 'vtex.store-icons'
import Popover from './Popover'

import styles from '../telemarketing.css'
import { useTelemarketingDispatch, useTelemarketingState, ErrorCode } from './StateProvider'

interface Props {
  /** Current signedin attendant email */
  attendantEmail: string
  /** Calls the impersonate on the parent component */
  onImpersonate: (s: string) => void
  /** If is mobile or not */
  mobile: boolean
}

const messages = defineMessages({
  label: {
    id: 'store/telemarketing-login.message',
    defaultMessage: '',
  },
  userNotRegistered: {
    id: 'store/telemarketing.error.user-not-registered',
    defaultMessage: '',
  },
  badUserInput: {
    id: 'store/telemarketing.error.bad-user-input',
    defaultMessage: '',
  },
  login: {
    id: 'store/telemarketing-login.button',
    defaultMessage: '',
  }
})

/** Component that shows the email input and calls the impersonate function using the Popover component. */
const LoginAsCustomer = ({
  intl,
  attendantEmail,
  onImpersonate,
  mobile,
}: Props & InjectedIntlProps) => {
  const { email, loading, error, errorCode } = useTelemarketingState()
  const dispatch = useTelemarketingDispatch()

  const handleHeaderRendering = useCallback(
    () => (
      <div className="flex items-center c-on-base--inverted">
        <IconProfile />
        <div className="ml2">
          <FormattedMessage id="store/telemarketing-login.message" />
        </div>
      </div>
    ),
    []
  )

  const onChange = useCallback((event) => {
    dispatch({ type: 'SET_EMAIL', email: event.target.value })
  }, [dispatch])

  const onSubmit = useCallback((event) => {
    event.preventDefault()
    onImpersonate(email)
  }, [email])

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
          <form onSubmit={onSubmit} className={`${styles.loginForm} c-disabled`}>
            <div className={`${styles.emailInput} mb5`}>
              <Input
                label={intl.formatMessage(messages.label)}
                value={email}
                onChange={onChange}
                placeholder={'Ex: example@mail.com'}
                error={error}
                errorMessage={error ?
                  errorCode === ErrorCode.USER_NOT_REGISTERED
                    ? intl.formatMessage(messages.userNotRegistered)
                    : errorCode === ErrorCode.BAD_USER_INPUT
                      ? intl.formatMessage(messages.badUserInput)
                      : ''
                  : ''
                }
              />
            </div>
            <Button
              type="submit"
              size="regular"
              isLoading={loading}
            >
              {intl.formatMessage(messages.login)}
            </Button>
          </form>
        </div>
      </Popover>
    </div>
  )
}

export default injectIntl(LoginAsCustomer)
