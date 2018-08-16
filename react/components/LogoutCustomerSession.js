import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'vtex.styleguide'
import { intlShape } from 'react-intl'

import { translate } from '../utils/translate'
import { truncateString } from '../utils/format-string'
import Popover from './Popover'
import TelemarketingIcon from '../icons/TelemarketingIcon'
import CustomerIcon from '../icons/CustomerIcon'

/** Component that shows the client info calls the setSession function  to logout. */
export default class LogoutCustomerSession extends Component {
  static propTypes = {
    /** Intl info */
    intl: intlShape,
    /** Signed in client name */
    clientName: PropTypes.string.isRequired,
    /** Signed in client document */
    clientDocument: PropTypes.string.isRequired,
    /** Signed in client phone */
    clientPhone: PropTypes.string.isRequired,
    /** Signed in client email */
    clientEmail: PropTypes.string.isRequired,
    /** Current signedin attendant email */
    attendantEmail: PropTypes.string.isRequired,
    /** Calls the setSession on the parent component */
    onSetSesssion: PropTypes.func.isRequired,
    /** Loading Status */
    loading: PropTypes.bool.isRequired,
  }

  handleHeaderRendering = () => {
    const { intl, clientEmail } = this.props

    return (
      <div className="flex align-center">
        <CustomerIcon />
        <div className="pa2">
          {clientEmail ? `${truncateString(clientEmail, 25)}` : null}
        </div>
      </div>
    )
  }

  render() {
    const {
      attendantEmail,
      clientEmail,
      clientDocument,
      clientPhone,
      onSetSesssion,
      loading,
      intl,
    } = this.props

    return (
      <div className="vtex-telemarketing__logout">
        <Popover renderHeader={this.handleHeaderRendering}>
          <div className="bg-red w-100 pa4">
            <div className="vtex-telemarketing__popover-header-icon">
              <TelemarketingIcon size={50} />
            </div>
            <div className="vtex-telemarketing__popover-header-email white-50">
              {attendantEmail}
            </div>
          </div>
          <div className="bg-white w-100 pa4">
            <div className="vtex-telemarketing__logout-form gray">
              <table className="w-100 pa3 bw1 bb b--silver">
                <tr>
                  <td>
                    <CustomerIcon color={'#828282'} />
                  </td>
                  <td>
                    <div className="pa3">{clientEmail}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    {translate('telemarketing-logout.document-label', intl)}
                  </td>
                  <td>
                    <div className="db pa3">{clientDocument}</div>
                  </td>
                </tr>
                <tr>
                  <td>{translate('telemarketing-logout.phone-label', intl)}</td>
                  <td>
                    <div className="db pa3">{clientPhone}</div>
                  </td>
                </tr>
              </table>
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
