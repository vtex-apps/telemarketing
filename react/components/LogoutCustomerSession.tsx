import React, { ReactNode, useMemo, useCallback } from 'react'
import classnames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import { IconAssistantSales, IconProfile } from 'vtex.store-icons'

import translate from '../utils/translate'
import Popover from './Popover'

import styles from '../telemarketing.css'

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
  /** If is mobile or not */
  mobile: boolean
  /** Children */
  readonly children?: ReactNode
}

/** Component that shows the client info calls the setSession function  to logout. */
const LogoutCustomerSession = (props: Props) => {
  const { intl, client, loading, onDepersonify, attendantEmail, mobile } = props

  const getClientName = (client: any) =>
    !!client
      ? client.name.includes('null')
        ? client.email.slice(0, client.email.indexOf('@'))
        : client.name
      : null

  const getHeader = (mobile: boolean) => {
    const headerClasses = classnames(
      'c-on-base--inverted',
      mobile ? 'flex align-center w-100' : 'flex align-center'
    )
    return (
      <div className={headerClasses}>
        <IconProfile />
        <div className={`pa2 ${styles.clientNameBar} w-100`}>
          {mobile ? clientName : client.email}
        </div>
      </div>
    )
  }

  const clientName = useMemo(() => getClientName(client), [client])
  const renderHeader = useCallback(() => getHeader(mobile), [mobile])

  return (
    <div className={`${styles.logout} ${mobile && 'w-50'}`}>
      <Popover
        arrowClasses="bg-emphasis"
        renderHeader={renderHeader}
        mobile={mobile}
      >
        <div className="bg-emphasis w-100 pa7">
          <div className={`${styles.popoverHeaderIcon} c-on-base--inverted`}>
            <IconAssistantSales size={50} />
          </div>
          <div className={`${styles.popoverHeaderEmail} c-on-emphasis`}>
            {attendantEmail}
          </div>
        </div>
        <div className="bg-base w-100 pt7 pb5 ph5">
          <div className={`${styles.logoutForm} c-disabled`}>
            <div className="w-100 bw1 bb b--muted-5 flex-wrap">
              <div
                className={`${
                  styles.clientName
                } w-100 t-heading-5 center pb5 c-on-base`}
              >
                {clientName}
              </div>

              <div className="w-100 flex flex-wrap t-small">
                <div className="tl pb5 pr2">Email</div>
                <div className="pb5 pl2 c-muted-3">{client.email}</div>
              </div>

              <div className="w-100 flex flex-wrap t-small">
                <div className="tl pb5 pr2">
                  {translate('store/telemarketing-logout.document-label', intl)}
                </div>
                <div className="pb5 pl2 c-muted-3">{client.document}</div>
              </div>

              <div className="w-100 flex flex-wrap t-small">
                <div className="tl pb5 pr2">
                  {translate('store/telemarketing-logout.phone-label', intl)}
                </div>
                <div className="pb5 pl2 c-muted-3">{client.phone}</div>
              </div>
            </div>
            <div className="flex justify-around mt5">
              <Link page="store.account">
                <Button size="regular">
                  {translate('store/telemarketing-logout.button-orders', intl)}
                </Button>
              </Link>
              <Button
                size="regular"
                onClick={() => onDepersonify()}
                isLoading={loading}
              >
                {translate('store/telemarketing-logout.button', intl)}
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default LogoutCustomerSession
