import React, { Component } from 'react'
import { Button } from 'vtex.styleguide'

import { translate } from '../utils/translate'
import { truncateString } from '../utils/format-string'
import Popover from './Popover'
import AttendantIcon from '../icons/AttendantIcon'
import ClientIcon from '../icons/ClientIcon'

export default class TelemarketingLogout extends Component {
  handleHeaderRendering = () => {
    const { intl, clientName } = this.props

    return (
      <div className="flex align-center">
        <ClientIcon />
        <div className="pa3">
          {translate('telemarketing.client', intl)}
          {clientName ? `: ${truncateString(clientName)}` : null}
        </div>
      </div>
    )
  }

  render() {
    const {
      attendantEmail,
      clientEmail,
      onSetSesssion,
      loading,
      intl,
    } = this.props

    return (
      <div className="vtex-telemarketing__logout">
        <Popover renderHeader={this.handleHeaderRendering}>
          <div className="bg-red w-100 pa4">
            <div className="vtex-telemarketing__popover-header-icon">
              <AttendantIcon size={50} />
            </div>
            <div className="vtex-telemarketing__popover-header-email">
              {attendantEmail}
            </div>
          </div>
          <div className="bg-white w-100 pa4">
            <div className="vtex-telemarketing__logout-form gray">
              <div className="flex justify-center pa3 bw1 bb b--silver">
                <ClientIcon color={'#828282'} />
                <div className="pa3">{clientEmail}</div>
              </div>
              <div className="flex justify-center">
                <span className="mt3">
                  <Button
                    size="small"
                    onClick={() => onSetSesssion('')}
                    isLoading={loading}
                  >
                    {translate('telemarketing-logout.button', intl)}
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    )
  }
}
