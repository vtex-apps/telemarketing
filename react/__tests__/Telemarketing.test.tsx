import React from 'react'
import { injectIntl } from 'react-intl'
import { render } from 'react-testing-library'

import Telemarketing from '../components/Telemarketing'

describe('<Telemarketing /> component', () => {
  it('should match snapshot', () => {
    const component = render(injectIntl(<Telemarketing />)).asFragment()
    expect(component).toMatchSnapshot()
  })
})
