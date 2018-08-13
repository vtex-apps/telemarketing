import React, { Component } from 'react'

import ClientIcon from '../icons/ClientIcon'
import { translate } from '../utils/translate'

export default class ImpersonateLogin extends Component {
  render() {
    const { intl } = this.props

    return (
      <div className="flex align-center">
        <ClientIcon />
        <div className="pa3">
          {translate('impersonate-customer.button', intl)}
        </div>
      </div>
    )
  }
}
