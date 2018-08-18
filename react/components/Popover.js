import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** Component that shows a content when it´s header is clicked*/
export default class Popover extends Component {
  static propTypes = {
    /** Function that will display the header */
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

      target.dispatchEvent(new Event('closeonclick'))
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

    const boxPositionStyle = {
      right: this.iconRef && this.iconRef.offsetWidth - 43,
    }

    return (
      <div className="vtex-popover relative">
        <div
          className="pointer"
          onClick={this.handleHeaderClick}
          ref={e => {
            this.iconRef = e
          }}
        >
          {renderHeader()}
        </div>
        <div
          className={`vtex-popover__box absolute z-max ${
            this.state.isBoxOpen ? 'flex' : 'dn'
          }`}
          style={boxPositionStyle}
          ref={this.boxRef_}
        >
          <div className="vtex-popover__content-container shadow-3 mt3 bg-white">
            {children}
          </div>
          <div className="vtex-popover__arrow-up absolute top-0 right-0-ns bg-white dib-ns dn-s" />
        </div>
      </div>
    )
  }
}
