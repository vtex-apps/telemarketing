import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { IconAssistantSales, IconProfile } from 'vtex.store-icons'
import { Button, Input } from 'vtex.styleguide'
import Popover from './Popover'

const CSS_HANDLES = [
  'login',
  'popoverHeaderIcon',
  'popoverHeaderEmail',
  'loginForm',
  'loginFormMessage',
  'emailInput',
  'loginButton',
  'loginAsText',
  'popoverHeader',
  'loginFormContainer',
] as const
interface Props {
  /** Current signedin attendant email */
  attendantEmail: string
  /** Input value */
  emailInput: string
  /** Sets the state of the parent component with new email value */
  onInputChange: (s: string) => void
  /** Calls the impersonate on the parent component */
  onImpersonate: (s: string) => void
  /** Loading status */
  loading: boolean
  /** If is mobile or not */
  mobile: boolean
  /** Feedback message */
  feedback: boolean
}

/** Component that shows the email input and calls the impersonate function using the Popover component. */
const LoginAsCustomer = ({
  attendantEmail,
  onInputChange,
  onImpersonate,
  loading,
  emailInput,
  mobile,
  feedback,
}: Props) => {
  const handles = useCssHandles(CSS_HANDLES)
  const handleHeaderRendering = useCallback(
    () => (
      <div className={`${handles.loginButton} flex items-center c-on-base--inverted`}>
        <IconProfile />
        <div className={`${handles.loginAsText} ml2`}>
          <FormattedMessage id="store/telemarketing-login.message" />
        </div>
      </div>
    ),
    []
  )

  const handleKeyPress = useCallback(
    (event: any) => {
      event.key === 'Enter' && onImpersonate(emailInput)
    },
    [emailInput]
  )

  return (
    <div className={`${handles.login} w-50 flex flex-row-reverse-ns flex-row-s`}>
      <Popover
        arrowClasses="bg-base--inverted"
        renderHeader={handleHeaderRendering}
        mobile={mobile}
      >
        <div className={`${handles.popoverHeader} bg-base--inverted w-100 pa7 c-on-base--inverted`}>
          <div className={handles.popoverHeaderIcon}>
            <IconAssistantSales size={50} />
          </div>
          <div className={`${handles.popoverHeaderEmail} white-50 mt3`}>
            {attendantEmail}
          </div>
        </div>
        <div className={`${handles.loginFormContainer} bg-base w-100 ph5 pb5 pt7`}>
          <div className={`${handles.loginForm} c-disabled`}>
            <div className={`${handles.loginFormMessage} t-small tl mb3`}>
              <FormattedMessage id="store/telemarketing-login.message" />
            </div>
            <div className={`${handles.emailInput} mb5`}>
              <Input
                value={emailInput}
                onChange={onInputChange}
                placeholder={'Ex: example@mail.com'}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              size="regular"
              onClick={() => onImpersonate(emailInput)}
              isLoading={loading}
            >
              <FormattedMessage id="store/telemarketing-login.button" />
            </Button>
            {
              feedback ? (
                <p className="tc bg-danger white pa3 f7 br2">
                  <FormattedMessage id="store/telemarketing-user-not-found" />
                </p>
              ) : <></>
            }
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default LoginAsCustomer
