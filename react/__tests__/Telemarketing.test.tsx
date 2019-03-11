import React from 'react'
import { render } from 'react-testing-library'

import Telemarketing from '../components/Telemarketing'
import messages from '../../messages/en-US.json'

describe('<Telemarketing /> component', () => {
  const intl = {
    formatMessage: ({ id = '' }) => messages[id],
  }

  it('should match snapshot without client', () => {
    const { asFragment } = render(
      <Telemarketing
        attendantEmail="attendant@vtex.com"
        emailInput="email@vtex.com"
        intl={intl}
        loading={false}
        onDepersonify={() => {}}
        onInputChange={() => {}}
        onSetSession={() => {}}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with client', () => {
    const client: Client = {
      document: 'document',
      phone: 'phone',
      name: 'name',
      email: 'client@vtex.com',
    }

    const { asFragment } = render(
      <Telemarketing
        attendantEmail="attendant@vtex.com"
        client={client}
        emailInput="email@vtex.com"
        intl={intl}
        loading={false}
        onDepersonify={() => {}}
        onInputChange={() => {}}
        onSetSession={() => {}}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should show attendant email', () => {
    const email = 'attendant@vtex.com'
    const { getByText } = render(
      <Telemarketing
        attendantEmail={email}
        emailInput="email@vtex.com"
        intl={intl}
        loading={false}
        onDepersonify={() => {}}
        onInputChange={() => {}}
        onSetSession={() => {}}
      />
    )

    const attendantEmail = getByText(email)
    expect(attendantEmail).toBeTruthy()
  })

  it('should show login button and form', () => {
    const { getByText, getByPlaceholderText } = render(
      <Telemarketing
        attendantEmail="attendant@vtex.com"
        emailInput="email@vtex.com"
        intl={intl}
        loading={false}
        onDepersonify={() => {}}
        onInputChange={() => {}}
        onSetSession={() => {}}
      />
    )

    const loginAs = getByText('Login as')
    expect(loginAs).toBeTruthy()

    const emailPlaceholder = getByPlaceholderText('Ex: example@mail.com')
    expect(emailPlaceholder).toBeTruthy()

    const login = getByText('Login')
    expect(login).toBeTruthy()
  })

  it('should show client data', () => {
    const client: Client = {
      document: 'my client document',
      phone: '+9999999999999',
      name: 'my client name',
      email: 'client@vtex.com',
    }

    const { getByText } = render(
      <Telemarketing
        attendantEmail="attendant@vtex.com"
        client={client}
        emailInput="email@vtex.com"
        intl={intl}
        loading={false}
        onDepersonify={() => {}}
        onInputChange={() => {}}
        onSetSession={() => {}}
      />
    )

    const document = getByText(client.document)
    expect(document).toBeTruthy()

    const phone = getByText(client.phone)
    expect(phone).toBeTruthy()

    const name = getByText(client.name)
    expect(name).toBeTruthy()

    const email = getByText(client.email)
    expect(email).toBeTruthy()
  })
})
