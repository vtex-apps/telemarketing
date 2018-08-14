import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Popover extends Component {
  static propTypes = {
    renderHeader: PropTypes.func.isRequired,
  }

  boxRef_ = React.createRef()

  state = {
    isBoxOpen: false,
  }

  handleDocumentMouseUp = e => {
    const { isBoxOpen } = this.state
    const target = e.target

    if (
      this.boxRef_.current &&
      (!this.boxRef_.current.contains(target) ||
        target.hasAttribute('closeonclick'))
    ) {
      isBoxOpen && this.setState({ isBoxOpen: false })
      this.removeListeners()

      target.dispatchEvent(e)
    }
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  removeListeners = () => {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp)
  }

  handleHeaderClick = () => {
    document.addEventListener('mouseup', this.handleDocumentMouseUp)

    this.setState({ isBoxOpen: !this.state.isBoxOpen })
  }

  render() {
    const { renderHeader, children } = this.props

    return (
      <div className="vtex-popover relative">
        <div className="pointer" onClick={this.handleHeaderClick}>
          {renderHeader()}
        </div>
        <div
          className={`vtex-popover__box absolute right-0 ${
            this.state.isBoxOpen ? 'flex' : 'dn'
          }`}
          ref={this.boxRef_}
        >
          <div className="vtex-popover__arrow-up absolute top-0 right-0 shadow-3 bg-white" />
          <div className="vtex-popover__content-container shadow-3 mt3 z-max bg-white">
            {children}
          </div>
        </div>
      </div>
    )
  }
}
