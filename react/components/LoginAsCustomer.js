import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'vtex.styleguide'
import { intlShape } from 'react-intl'

import CustomerIcon from '../icons/CustomerIcon'
import TelemarketingIcon from '../icons/TelemarketingIcon'
import Popover from './Popover'
import { translate } from '../utils/translate'

/** Component that shows the email input and calls the setSession function using the Popover component. */
export default class LoginAsCustomer extends Component {
  static propTypes = {
    /** Current signedin attendant email */
    attendantEmail: PropTypes.string.isRequired,
    /** Input value */
    clientEmail: PropTypes.string.isRequired,
    /** Sets the state of the parent component with new email value */
    onInputChange: PropTypes.func.isRequired,
    /** Calls the setSession on the parent component */
    onSetSesssion: PropTypes.func.isRequired,
    /** Loading status */
    loading: PropTypes.bool.isRequired,
    /** Intl info */
    intl: intlShape,
  }

  handleHeaderRendering = () => {
    const { intl } = this.props

    return (
      <div className="flex align-center">
        <CustomerIcon />
        <div className="pa2">
          {translate('telemarketing-login.message', intl)}
        </div>
      </div>
    )
  }

  handleKeyPress = event => {
    const { onSetSesssion, clientEmail } = this.props

    if (event.key === 'Enter') {
      onSetSesssion(clientEmail)
    }
  }

  render() {
    const {
      attendantEmail,
      onInputChange,
      onSetSesssion,
      loading,
      clientEmail,
      intl,
    } = this.props

    return (
      <div className="vtex-telemarketing__login">
        <Popover renderHeader={this.handleHeaderRendering}>
          <div className="bg-black-90 w-100 pa4">
            <div className="vtex-telemarketing__popover-header-icon">
              <TelemarketingIcon size={50} />
            </div>
            <div className="vtex-telemarketing__popover-header-email white-50">
              {attendantEmail}
            </div>
          </div>
          <div className="bg-white w-100 pa4">
            <div className="vtex-telemarketing__login-form gray">
              <div className="vtex-telemarketing__login-form-message tl mv3">
                {translate('telemarketing-login.message', intl)}
              </div>
              <div className="vtex-telemarketing__email-input mv3">
                <Input
                  value={clientEmail}
                  onChange={onInputChange}
                  placeholder={'Ex: example@mail.com'}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
              <Button
                size="small"
                onClick={() => onSetSesssion(clientEmail)}
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
