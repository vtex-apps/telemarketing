import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'vtex.styleguide'

import ClientIcon from '../icons/ClientIcon'
import AttendantIcon from '../icons/AttendantIcon'
import Popover from './Popover'
import { translate } from '../utils/translate'

export default class TelemarketingLogin extends Component {
  static propTypes = {
    attendantEmail: PropTypes.string.isRequired,
    clientEmail: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSetSesssion: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  handleHeaderRendering = () => {
    const { intl } = this.props

    return (
      <div className="flex align-center">
        <ClientIcon />
        <div className="pa3">
          {translate('telemarketing-login.message', intl)}
        </div>
      </div>
    )
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
              <AttendantIcon size={50} />
            </div>
            <div className="vtex-telemarketing__popover-header-email">
              {attendantEmail}
            </div>
          </div>
          <div className="bg-white w-100 pa4">
            <div className="vtex-telemarketing__login-form gray">
              <div className="vtex-telemarketing__login-form-message mv3">
                {translate('telemarketing-login.message', intl)}
              </div>
              <div className="vtex-telemarketing__email-input mv3">
                <Input
                  value={clientEmail}
                  onChange={onInputChange}
                  placeholder={'Ex: example@mail.com'}
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
