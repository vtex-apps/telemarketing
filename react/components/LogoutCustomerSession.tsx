import React, { Component, ReactNode } from 'react'
import { Link } from 'render'
import { Button } from 'vtex.styleguide'
import { path } from 'ramda'

import { truncateString } from '../utils/format-string'
import translate from '../utils/translate'

import Icon from 'vtex.use-svg/Icon'
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
  /** Children */
  readonly children?: ReactNode,
}

/** Component that shows the client info calls the setSession function  to logout. */
export default class LogoutCustomerSession extends Component<Props> {
  public render() {
    const { intl, client, loading, onDepersonify, attendantEmail } = this.props
    const mobile = path(['__RUNTIME__', 'hints', 'mobile'], global)

    return (
      <div className={`vtex-telemarketing__logout ${mobile && 'w-50'}`}>
        <Popover arrowClasses="bg-emphasis" renderHeader={this.handleHeaderRendering}>
          <div className="bg-emphasis w-100 pa4">
            <div className="vtex-telemarketing__popover-header-icon pa4">
              <Icon id="telemarketing" size={50} viewBox="0 0 21 21" />
            </div>
            <div className="vtex-telemarketing__popover-header-email c-on-emphasis">
              {attendantEmail}
            </div>
          </div>
          <div className="bg-base w-100 pb4 ph4">
            <div className="vtex-telemarketing__logout-form c-disabled">
              <div className="w-100 pb3 ph3 bw1 bb b--muted-5 flex-wrap">
                <div className="w-100 t-heading-6 center b pa5">{this.clientName}</div>

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

  private handleHeaderRendering = () => {
    const { client } = this.props
    const mobile = path(['__RUNTIME__', 'hints', 'mobile'], global)
    const classBar = mobile ? "flex align-center w-100" : "flex align-center"

    return (
      <div className={classBar}>
        <Icon id="hpa-profile" size={25} className="white"/>
        <div className="pa2 vtex-telemarketing__client-name-bar w-100">
          {mobile ? this.clientName : client.email}
        </div>
      </div>
    )
  }

  private get clientName() {
    const { client } = this.props

    if (client) {
      return client.name.includes('null') ? client.email.slice(0, client.email.indexOf('@')) : client.name
    }
  }
}