import React from 'react'
import { render } from 'react-testing-library'

import Telemarketing from '../components/Telemarketing'

describe('<Telemarketing /> component', () => {
  it('should match snapshot', () => {
    const intl = {
      formatMessage: ({ id = '' }) => id,
    }

    const component = render(
      <Telemarketing
        attendantEmail="attendant@vtex.com"
        emailInput="email@vtex.com"
        loading={false}
        intl={intl}
      />
    ).asFragment()
    expect(component).toMatchSnapshot()
  })
})
