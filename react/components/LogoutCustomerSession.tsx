import { path } from 'ramda'
import React, { Component, ReactNode } from 'react'
import { Link } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import { IconAssistantSales, IconProfile } from 'vtex.store-icons'

import telemarketing from '../telemarketing.css'
import translate from '../utils/translate'
import Popover from './Popover'

interface Props {
  /** Intl info */
  intl: any
  /** Signed in client */
  client: Client
  /** Loading Status */
  loading: boolean
  /** Calls the depersonify on the parent component */
  onDepersonify: () => any
  /** Current signedin attendant email */
  attendantEmail: string
  /** Children */
  readonly children?: ReactNode
}

/** Component that shows the client info calls the setSession function  to logout. */
export default class LogoutCustomerSession extends Component<Props> {
  public render() {
    const { intl, client, loading, onDepersonify, attendantEmail } = this.props
    // TODO Use runtimeContext
    const mobile = path(['__RUNTIME__', 'hints', 'mobile'], global)

    return (
      <div className={`${telemarketing.logout} ${mobile && 'w-50'}`}>
        <Popover
          arrowClasses="bg-emphasis"
          renderHeader={this.handleHeaderRendering}
        >
          <div className="bg-emphasis w-100 pa4">
            <div className={`${telemarketing.popoverHeaderIcon} pa4`}>
              <IconAssistantSales size={50} activeClassName="white" />
            </div>
            <div
              className={`${telemarketing.popoverHeaderEmail} c-on-emphasis`}
            >
              {attendantEmail}
            </div>
          </div>
          <div className="bg-base w-100 pb4 ph4">
            <div className={`${telemarketing.logoutForm} c-disabled`}>
              <div className="w-100 pb3 ph3 bw1 bb b--muted-5 flex-wrap">
                <div
                  className={`${
                    telemarketing.clientName
                  } w-100 t-heading-6 center b pa5`}
                >
                  {this.clientName}
                </div>

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
                <Link page="store.account">
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
    const classBar = mobile ? 'flex align-center w-100' : 'flex align-center'

    return (
      <div className={classBar}>
        <IconProfile size={25} activeClassName="white" />
        <div className={`pa2 ${telemarketing.clientNameBar} w-100`}>
          {mobile ? this.clientName : client.email}
        </div>
      </div>
    )
  }

  private get clientName() {
    const { client } = this.props

    if (client) {
      return client.name.includes('null')
        ? client.email.slice(0, client.email.indexOf('@'))
        : client.name
    }
    return null
  }
}
