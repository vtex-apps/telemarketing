import React from 'react'
import { render } from 'react-testing-library'

import Telemarketing from '../components/Telemarketing'
import messages from '../../messages/en-US.json'

describe('<Telemarketing /> component', () => {
  const intl = {
    formatMessage: ({ id = '' }) => messages[id],
  }

  it('should match snapshot without client', () => {
    const component = render(
      <Telemarketing
        attendantEmail="attendant@vtex.com"
        emailInput="email@vtex.com"
        intl={intl}
        loading={false}
        onDepersonify={() => {}}
        onInputChange={() => {}}
        onSetSession={() => {}}
      />
    ).asFragment()
    expect(component).toMatchSnapshot()
  })

  it('should match snapshot with client', () => {
    const client: Client = {
      document: 'document',
      phone: 'phone',
      name: 'name',
      email: 'client@vtex.com',
    }

    const component = render(
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
    ).asFragment()
    expect(component).toMatchSnapshot()
  })
})
