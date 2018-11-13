import React, { Component } from 'react'
import { Link } from 'render'
import { Button } from 'vtex.styleguide'

import { truncateString } from '../utils/format-string'
import translate from '../utils/translate'

import CustomerIcon from '../icons/CustomerIcon'
import TelemarketingIcon from '../icons/TelemarketingIcon'
import Popover from './Popover'

interface Props {
  /** Intl info */
  intl: any,
  /** Signed in client */
  client: Client,
  /** Loading Status */
  loading: boolean,
  /** Calls the depersonify on the parent component */
  onDepersonify: () => any,
  /** Current signedin attendant email */
  attendantEmail: string,
}

/** Component that shows the client info calls the setSession function  to logout. */
export default class LogoutCustomerSession extends Component<Props> {
  public render() {
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
              <div className="w-100 pa3 bw1 bb b--muted-3 flex flex-wrap">
                <div className="w-100 t-heading-6 center b pa4">{client.name}</div>

                <div className="w-50 tl pa3">Email</div>
                <div className="w-50 pa3">{client.email}</div>

                <div className="w-50 tl pa3">
                  {translate('telemarketing-logout.document-label', intl)}
                </div>
                <div className="w-50 pa3">{client.document}</div>

                <div className="w-50 tl pa3">
                  {translate('telemarketing-logout.phone-label', intl)}
                </div>
                <div className="w-50 pa3">{client.phone}</div>
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

  private handleHeaderRendering = () => {
    const { client } = this.props

    return (
      <div className="flex align-center">
        <CustomerIcon size={30} color={"#000000"}/>
        <div className="pa2">
          {client.email ? `${truncateString(client.email, 25)}` : null}
        </div>
      </div>
    )
  }
}