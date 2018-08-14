import React, { Component } from 'react'

import ClientIcon from '../icons/ClientIcon'
import AttendantIcon from '../icons/AttendantIcon'

import Popover from './Popover'
import { translate } from '../utils/translate'
import PropTypes from 'prop-types'

export default class ImpersonateLogin extends Component {
  static propTypes = {
    attendantName: PropTypes.string.isRequired,
    attendantEmail: PropTypes.string,
  }

  static defaultProps = {
    attendantName: 'Ana Beatriz',
    attendantEmail: 'anabeatriz@mail.com',
  }

  handleHeaderRendering = () => {
    const { intl } = this.props

    return (
      <div className="flex align-center">
        <ClientIcon />
        <div className="pa3">
          {translate('impersonate-customer.button', intl)}
        </div>
      </div>
    )
  }

  render() {
    const { attendantName, attendantEmail } = this.props
    return (
      <div className="vtex-telemarketing__login">
        <Popover renderHeader={this.handleHeaderRendering}>
          <div className="bg-black-90 w-100 pa4">
            <div className="vtex-telemarketing__login-icon">
              <AttendantIcon size={50} />
            </div>
            <div className="vtex-telemarketing__login-name">
              {attendantName}
            </div>
            <div className="vtex-telemarketing__login-email">
              {attendantEmail}
            </div>
          </div>
          <div className="bg-white w-100 pa4">
            <div className="vtex-telemarketing__login-form">
              <br />
            </div>
          </div>
        </Popover>
      </div>
    )
  }
}
