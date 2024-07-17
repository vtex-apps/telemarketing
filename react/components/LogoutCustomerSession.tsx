import classnames from 'classnames'
import React, { ReactNode, useCallback, useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'
// import { Link } from 'vtex.render-runtime'
import { IconAssistantSales, IconProfile } from 'vtex.store-icons'
import { Button } from 'vtex.styleguide'

import Popover from './Popover'

import { FormattedMessage } from 'react-intl'

const CSS_HANDLES = [
  'logoutHeader',
  'clientNameBar',
  'logout',
  'popoverHeaderIcon',
  'popoverHeaderEmail',
  'logoutForm',
  'clientName',
  'popoverHeader',
  'logoutInfoContainer',
  'emailContainer',
  'emailField',
  'emailValue',
  'documentContainer',
  'documentField',
  'documentValue',
  'phoneContainer',
  'phoneField',
  'phoneValue',
  'logoutButtonsContainer',
] as const
interface Props {
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
  const { client, loading, onDepersonify, attendantEmail, mobile } = props
  const handles = useCssHandles(CSS_HANDLES)

  const getClientName = (client: any) =>
    !!client
      ? client.name.includes('null')
        ? client.email.slice(0, client.email.indexOf('@'))
        : client.name
      : null

  const getHeader = (mobile: boolean) => {
    const headerClasses = classnames(
      handles.logoutHeader,
      'c-on-base--inverted',
      mobile ? 'flex items-center w-100' : 'flex items-center'
    )
    return (
      <div className={headerClasses}>
        <IconProfile />
        <div className={`pa2 ${handles.clientNameBar} w-100`}>{clientName}</div>
      </div>
    )
  }

  const clientName = useMemo(() => getClientName(client), [client])
  const renderHeader = useCallback(() => getHeader(mobile), [mobile])

  return (
    <div className={`${handles.logout} ${mobile && 'w-50'}`}>
      <Popover
        arrowClasses="bg-emphasis"
        renderHeader={renderHeader}
        mobile={mobile}
      >
        <div className={`${handles.popoverHeader} bg-emphasis w-100 pa7`}>
          <div className={`${handles.popoverHeaderIcon} c-on-base--inverted`}>
            <IconAssistantSales size={50} />
          </div>
          <div className={`${handles.popoverHeaderEmail} c-on-emphasis`}>
            {attendantEmail}
          </div>
        </div>
        <div className={`${handles.logoutInfoContainer} bg-base w-100 pt7 pb5 ph5`}>
          <div className={`${handles.logoutForm} c-disabled`}>
            <div className="w-100 bw1 bb b--muted-5 flex-wrap">
              <div
                className={`${handles.clientName} w-100 t-heading-5 center pb5 c-on-base`}
              >
                {clientName}
              </div>

              <div className={`${handles.emailContainer} w-100 flex flex-wrap t-small`}>
                <div className={`${handles.emailField} tl pb5 pr2`}>Email</div>
                <div className={`${handles.emailValue} pb5 pl2 c-muted-1`}>{client.email}</div>
              </div>

              <div className={`${handles.documentContainer} w-100 flex flex-wrap t-small`}>
                <div className={`${handles.documentField} tl pb5 pr2`}>
                  <FormattedMessage id="store/telemarketing-logout.document-label" />
                </div>
                <div className={`${handles.documentValue} pb5 pl2 c-muted-1`}>{client.document}</div>
              </div>

              <div className={`${handles.phoneContainer} w-100 flex flex-wrap t-small`}>
                <div className={`${handles.phoneField} tl pb5 pr2`}>
                  <FormattedMessage id="store/telemarketing-logout.phone-label" />
                </div>
                <div className={`${handles.phoneValue} pb5 pl2 c-muted-1`}>{client.phone}</div>
              </div>
            </div>
            <div className={`${handles.logoutButtonsContainer} mt5`}>
              {/* <Link page="store.account">
                <Button size="regular">
                  <FormattedMessage id="store/telemarketing-logout.button-orders" />
                </Button>
              </Link> */}
              <Button
                size="regular"
                onClick={() => onDepersonify()}
                isLoading={loading}
              >
                <FormattedMessage id="store/telemarketing-logout.button" />
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default LogoutCustomerSession
