import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import Telemarketing from '../components/Telemarketing'
import { useTelemarketingState, State, ErrorCode } from '../components/StateProvider'

const useTelemarketingStateMocked = useTelemarketingState as jest.Mock<State>

jest.mock('../components/StateProvider', () => {
  const { ErrorCode } = jest.requireActual('../components/StateProvider')

  return {
    ErrorCode,
    useTelemarketingState: jest.fn(),
    useTelemarketingDispatch: jest.fn()
  }
})

describe('<Telemarketing /> component', () => {
  const renderComponent = (customProps = {}) => {
    const defaultProps = {
      attendantEmail: 'attendant@vtex.com',
      onDepersonify: () => {},
      onInputChange: () => {},
      onImpersonate: () => {},
    }

    return render(
      <Telemarketing {...defaultProps} {...customProps} />
    )
  }

  it('should match snapshot without client', () => {
    useTelemarketingStateMocked.mockImplementation(() => ({
      email: '',
      loading: false,
      error: false,
      errorCode: null,
    }))

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

    const loginButton = getByText('Login')
    fireEvent.click(loginButton)

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

  it('should handle invalid email', () => {
    useTelemarketingStateMocked.mockImplementation(() => ({
      email: '',
      loading: false,
      error: true,
      errorCode: ErrorCode.BAD_USER_INPUT,
    }))

    const { getByText } = renderComponent()
    const invalidEmail = getByText('Type a valid email.')

    expect(invalidEmail).toBeTruthy()
  })

  it('should handle user not registered', () => {
    useTelemarketingStateMocked.mockImplementation(() => ({
      email: '',
      loading: false,
      error: true,
      errorCode: ErrorCode.USER_NOT_REGISTERED,
    }))

    const { getByText } = renderComponent()
    const invalidEmail = getByText('User not registered.')

    expect(invalidEmail).toBeTruthy()
  })
})
