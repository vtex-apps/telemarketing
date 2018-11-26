import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'vtex.styleguide'
import { intlShape } from 'react-intl'

import CustomerIcon from '../icons/CustomerIcon'
import TelemarketingIcon from '../icons/TelemarketingIcon'
import Popover from './Popover'
import translate from '../utils/translate'

/** Component that shows the email input and calls the setSession function using the Popover component. */
export default class LoginAsCustomer extends Component {
  handleHeaderRendering = () => {
    const { intl } = this.props

    return (
      <div className="flex items-center">
        <CustomerIcon />
        <div className="ml2">
          {translate('telemarketing-login.message', intl)}
        </div>
      </div>
    )
  }

  handleKeyPress = event => {
    const { onSetSession, emailInput } = this.props

    if (event.key === 'Enter') {
      onSetSession(emailInput)
    }
  }

  render() {
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
              <TelemarketingIcon size={50} />
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
}

LoginAsCustomer.propTypes = {
  /** Current signedin attendant email */
  attendantEmail: PropTypes.string.isRequired,
  /** Input value */
  emailInput: PropTypes.string.isRequired,
  /** Sets the state of the parent component with new email value */
  onInputChange: PropTypes.func.isRequired,
  /** Calls the setSession on the parent component */
  onSetSession: PropTypes.func.isRequired,
  /** Loading status */
  loading: PropTypes.bool.isRequired,
  /** Intl info */
  intl: intlShape,
}
