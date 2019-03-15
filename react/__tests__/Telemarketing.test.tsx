import React from 'react'
import { mergeDeepRight } from 'ramda'
import { render, fireEvent } from '@vtex/test-tools/react'

import Telemarketing from '../components/Telemarketing'
import messages from '../../messages/en.json'

describe('<Telemarketing /> component', () => {
  const intl = {
    formatMessage: ({ id = '' }) => (messages as any)[id],
  }

  const renderComponent = (customProps = {}) => {
    const defaultProps = {
      attendantEmail: 'attendant@vtex.com',
      emailInput: 'email@vtex.com',
      intl: intl,
      loading: false,
      onDepersonify: () => {},
      onInputChange: () => {},
      onSetSession: () => {},
    }

    const props = mergeDeepRight(defaultProps, customProps)
    return render(<Telemarketing {...props} />)
  }

  it('should match snapshot without client', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with client', () => {
    const client: Client = {
      document: 'document',
      phone: 'phone',
      name: 'name',
      email: 'client@vtex.com',
    }

    const { asFragment } = renderComponent({ client: client })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should show attendant email', () => {
    const email = 'nice_attendant_email@vtex.com'
    const { getByText } = renderComponent({ attendantEmail: email })

    const attendantEmail = getByText(email)
    expect(attendantEmail).toBeTruthy()
  })

  it('should show login button and form', () => {
    const { getByText, getByPlaceholderText } = renderComponent()

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

    const { getByText } = renderComponent({ client: client })

    const document = getByText(client.document)
    expect(document).toBeTruthy()

    const phone = getByText(client.phone)
    expect(phone).toBeTruthy()

    const name = getByText(client.name)
    expect(name).toBeTruthy()

    const email = getByText(client.email)
    expect(email).toBeTruthy()
  })

  it('should login when clicked', () => {
    const onSetSession = jest.fn()
    const { getByText } = renderComponent({ onSetSession: onSetSession })

    fireEvent.click(getByText('Login'))

    expect(onSetSession).toBeCalledTimes(1)
  })

  it('should logout when clicked', () => {
    const onDepersonify = jest.fn()
    const client: Client = {
      document: 'my client document',
      phone: '+9999999999999',
      name: 'my client name',
      email: 'client@vtex.com',
    }

    const { getByText } = renderComponent({
      client: client,
      onDepersonify: onDepersonify,
    })

    fireEvent.click(getByText('Logout'))

    expect(onDepersonify).toBeCalledTimes(1)
  })
})
