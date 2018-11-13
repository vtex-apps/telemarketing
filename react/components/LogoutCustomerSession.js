import { Link } from 'render'
import PropTypes from 'prop-types'
import { Button } from 'vtex.styleguide'
import { intlShape } from 'react-intl'
import React, { Component } from 'react'

import translate from '../utils/translate'
import { clientPropTypes } from '../utils/propTypes'
import { truncateString } from '../utils/format-string'

import Popover from './Popover'
import CustomerIcon from '../icons/CustomerIcon'
import TelemarketingIcon from '../icons/TelemarketingIcon'

/** Component that shows the client info calls the setSession function  to logout. */
export default class LogoutCustomerSession extends Component {
  
  handleHeaderRendering = () => {
    const { client } = this.props

    return (
      <div className="flex align-center">
        <CustomerIcon />
        <div className="pa2">
          {client.email ? `${truncateString(client.email, 25)}` : null}
        </div>
      </div>
    )
  }

  getClientName = () => {
    const { client } = this.props

    return client.name.includes('null') ? client.email.slice(0, client.email.indexOf('@')) : client.name;
  }

  render() {
    const { intl, client, loading, onDepersonify, attendantEmail } = this.props
    
    return (
      <div className="vtex-telemarketing__logout">
        <Popover arrowClasses="bg-emphasis" renderHeader={this.handleHeaderRendering}>
          <div className="bg-emphasis w-100 pa4">
            <div className="vtex-telemarketing__popover-header-icon">
              <TelemarketingIcon size={50} />
            </div>
            <div className="vtex-telemarketing__popover-header-email c-on-emphasis">
              {attendantEmail}
            </div>
          </div>
          <div className="bg-base w-100 pa4">
            <div className="vtex-telemarketing__logout-form c-disabled">
              <div className="w-100 pa3 bw1 bb b--muted-5 flex-wrap">
                <div className="w-100 t-heading-6 center b pa4">{this.getClientName()}</div>

                <div className="w-100 flex flex-wrap">
                  <div className="tl pa2">Email</div>
                  <div className="pa2 c-muted-3">{client.email}</div>
                </div>

                <div className="w-100 flex flex-wrap">
                  <div className="tl pa2">
                    {translate('telemarketing-logout.document-label', intl)}
                  </div>
                  <div className="pa2 c-muted-3">{client.document}</div>
                </div>

                <div className="w-100 flex flex-wrap">
                  <div className="tl pa2">
                    {translate('telemarketing-logout.phone-label', intl)}
                  </div>
                  <div className="pa2 c-muted-3">{client.phone}</div>
                </div>
                
              </div>
              <div className="flex justify-around mt3">
                <Link page="store/account/orders">
                  <Button size="small">
                    {translate('telemarketing-logout.button-orders', intl)}
                  </Button>
                </Link>
                <Button
                  size="small"
                  onClick={() => onDepersonify()}
                  isLoading={loading}
                >
                  {translate('telemarketing-logout.button', intl)}
                </Button>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    )
  }
}

LogoutCustomerSession.propTypes = {
  /** Intl info */
  intl: intlShape,
  /** Signed in client */
  client: clientPropTypes.isRequired,
  /** Loading Status */
  loading: PropTypes.bool.isRequired,
  /** Calls the depersonify on the parent component */
  onDepersonify: PropTypes.func.isRequired,
  /** Current signedin attendant email */
  attendantEmail: PropTypes.string.isRequired,
}
