import React from 'react'
import { mergeDeepRight } from 'ramda'
import { render, fireEvent } from '@vtex/test-tools/react'

import Telemarketing from '../components/Telemarketing'

describe('<Telemarketing /> component', () => {
  const renderComponent = (customProps = {}) => {
    const defaultProps = {
      attendantEmail: 'attendant@vtex.com',
      emailInput: 'email@vtex.com',
      loading: false,
      onDepersonify: () => {},
      onInputChange: () => {},
      onImpersonate: () => {},
    }

    return render(<Telemarketing {...defaultProps} {...customProps} />)
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

    const { getByText, getAllByText } = renderComponent({ client: client })

    const document = getByText(client.document)
    expect(document).toBeTruthy()

    const phone = getByText(client.phone)
    expect(phone).toBeTruthy()

    const name = getAllByText(client.name)
    expect(name).toBeTruthy()

    const email = getByText(client.email)
    expect(email).toBeTruthy()
  })

  it('should login when clicked', () => {
    const onImpersonate = jest.fn()
    const { getByText } = renderComponent({ onImpersonate: onImpersonate })

    fireEvent.click(getByText('Login'))

    expect(onImpersonate).toBeCalledTimes(1)
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
