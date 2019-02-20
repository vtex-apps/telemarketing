import React, { ReactNode, useMemo } from 'react'
import { Link, useRuntime } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import { IconAssistantSales, IconProfile } from 'vtex.dreamstore-icons'
import translate from '../utils/translate'
import Popover from './Popover'

import style from '../telemarketing.css'

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
const LogoutCustomerSession = (props: Props) => {
  const { intl, client, loading, onDepersonify, attendantEmail } = props
  const {
    hints: { mobile },
  } = useRuntime()

  const getClientName = (client: any) =>
    !!client
      ? client.name.includes('null')
        ? client.email.slice(0, client.email.indexOf('@'))
        : client.name
      : null

  const calculateHeader = (mobile: boolean) => {
    const classBar = mobile ? 'flex align-center w-100' : 'flex align-center'
    return (
      <div className={classBar}>
        <IconProfile size={25} activeClassName="white" />
        <div className={`pa2 ${style.clientNameBar} w-100`}>
          {mobile ? clientName : client.email}
        </div>
      </div>
    )
  }

  const clientName = useMemo(() => getClientName(client), [client])
  const header = useMemo(() => calculateHeader(mobile), [mobile])

  return (
    <div className={`${style.logout} ${mobile && 'w-50'}`}>
      <Popover arrowClasses="bg-emphasis" renderHeader={header}>
        <div className="bg-emphasis w-100 pa4">
          <div className={`${style.popoverHeaderIcon} pa4`}>
            <IconAssistantSales size={50} activeClassName="white" />
          </div>
          <div className={`${style.popoverHeaderEmail} c-on-emphasis`}>
            {attendantEmail}
          </div>
        </div>
        <div className="bg-base w-100 pb4 ph4">
          <div className={`${style.logoutForm} c-disabled`}>
            <div className="w-100 pb3 ph3 bw1 bb b--muted-5 flex-wrap">
              <div
                className={`${style.clientName} w-100 t-heading-6 center b pa5`}
              >
                {clientName}
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

export default LogoutCustomerSession
