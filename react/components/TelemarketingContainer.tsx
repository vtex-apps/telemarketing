import { compose } from 'ramda'
import React, { FC, useState } from 'react'
import { graphql } from 'react-apollo'
import sessionQuery from 'vtex.store-resources/QuerySession'
import processSession from '../utils/processSession'
import { withSession } from 'vtex.render-runtime'
import isMyVtex from '../utils/isMyVtex'
import Telemarketing from './Telemarketing'
import axios from 'axios'
import { OrderForm } from 'vtex.order-manager'

const { useOrderForm } = OrderForm

interface Props {
  /** Query with the session */
  session?: Session
}

const TelemarketingContainer: FC<Props> = ({session}) => {
  const [emailInput, setEmailInput] = useState<string>('')
  const [loadingImpersonate, setloadingImpersonate] = useState<boolean>(false)

  const { orderForm, setOrderForm, loading } = useOrderForm()

  const processedSession = processSession(session)

  if (!processedSession?.canImpersonate || loading) {
    return null
  }

  const handleInputChange = (event: any) => {
    setEmailInput(event.target.value)
  }

  const handleDepersonify = () => {
    setloadingImpersonate(true)

    axios.get('/api/checkout/pub/orderForm')
      .then(async res => {
        const { orderFormId } = res?.data

        await axios.get(`/checkout/changeToAnonymousUser/${orderFormId}`)
          .then(res => {
            console.log('changeToAnonymousUser', {res})
            setOrderForm({...orderForm, clientProfileData: null})
          })
      })
      .finally(() => {
        setloadingImpersonate(false)
      })
  }

  const handleImpersonate = (email: string) => {
    setloadingImpersonate(true)

    console.log('handleImpersonate', email)

    axios.get('/api/checkout/pub/orderForm')
      .then(async res => {
        const { orderFormId } = res?.data

        await axios.post(`/api/checkout/pub/orderForm/${orderFormId}/attachments/clientProfileData`, 
          {
          email
          })
          .then(async () => {

            await axios.post(`/api/checkout/pub/orderForm/${orderFormId}/attachments/shippingData`,
              {
                selectedAddresses: []
              }
            ).then(res => {
              console.log('shippingData', {res})
              setOrderForm(res.data)
            })

          })
      })
      .finally(() => {
        setloadingImpersonate(false)
      })
  }

  const { attendantEmail } = processedSession

  let client: Client | undefined = undefined

  if (orderForm?.clientProfileData?.email && attendantEmail !== orderForm.clientProfileData.email) {
    client = {
      document: orderForm.clientProfileData.document,
      phone: orderForm.clientProfileData.phone,
      name: `${orderForm.clientProfileData.firstName} ${orderForm.clientProfileData.lastName}`,
      email: orderForm.clientProfileData.email
    }
  }

  return (
    <Telemarketing
      client={client}
      loading={loadingImpersonate}
      emailInput={emailInput}
      attendantEmail={attendantEmail}
      onImpersonate={handleImpersonate}
      onDepersonify={handleDepersonify}
      onInputChange={handleInputChange}
    />
  )
}

const options = {
  name: 'session',
  skip: () => !isMyVtex(),
  options: () => ({
    ssr: false,
  }),
}

const EnhancedTelemarketing = withSession({ loading: React.Fragment })(
  compose(
    graphql(sessionQuery, options),
  )(TelemarketingContainer as any)
)

export default EnhancedTelemarketing

