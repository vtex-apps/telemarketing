import React, { Component } from 'react'
import { Button, Input } from 'vtex.styleguide'

import Icon from 'vtex.use-svg/Icon'
import translate from '../utils/translate'
import Popover from './Popover'

interface Props {
  /** Current signedin attendant email */
  attendantEmail: string,
  /** Input value */
  emailInput: string,
  /** Sets the state of the parent component with new email value */
  onInputChange: (s: string) => void,
  /** Calls the setSession on the parent component */
  onSetSession: (s: string) => void,
  /** Loading status */
  loading: boolean,
  /** Intl info */
  intl: any,
}

/** Component that shows the email input and calls the setSession function using the Popover component. */
export default class LoginAsCustomer extends Component<Props> {
  public render() {
    const {
      attendantEmail,
      onInputChange,
      onSetSession,
      loading,
      emailInput,
      intl,
    } = this.props

    return (
      <div className="vtex-telemarketing__login pr4">
        <Popover arrowClasses="bg-base--inverted" renderHeader={this.handleHeaderRendering}>
          <div className="bg-base--inverted w-100 pa4">
            <div className="vtex-telemarketing__popover-header-icon">
              <Icon id="telemarketing" size={50} viewBox="0 0 21 21" />
            </div>
            <div className="vtex-telemarketing__popover-header-email white-50 mt3 c-on-base--inverted">
              {attendantEmail}
            </div>
          </div>
          <div className="bg-base w-100 pa4">
            <div className="vtex-telemarketing__login-form c-disabled">
              <div className="vtex-telemarketing__login-form-message tl mv3">
                {translate('telemarketing-login.message', intl)}
              </div>
              <div className="vtex-telemarketing__email-input mv3">
                <Input
                  value={emailInput}
                  onChange={onInputChange}
                  placeholder={'Ex: example@mail.com'}
                  onKeyPress={this.handleKeyPress}
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

  private handleHeaderRendering = () => {
    const { intl } = this.props

    return (
      <div className="flex items-center">
        <Icon id="hpa-profile" size={25} className="white"/>
        <div className="ml2">
          {translate('telemarketing-login.message', intl)}
        </div>
      </div>
    )
  }

  private handleKeyPress = (event: any) => {
    const { onSetSession, emailInput } = this.props

    if (event.key === 'Enter') {
      onSetSession(emailInput)
    }
  }
}