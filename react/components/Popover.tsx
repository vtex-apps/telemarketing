import React, { Component } from 'react'

interface Props {
  /** Function that will display the header */
  renderHeader: () => any,
}

/** Component that shows a content when it´s header is clicked */
export default class Popover extends Component<Props> {
  public boxRef: any = React.createRef()

  public state = {
    isBoxOpen: false,
  }

  private iconRef: any

  public componentWillUnmount() {
    this.removeListeners()
  }

  public render() {
    const { renderHeader, children } = this.props

    const boxPositionStyle = {
      right: this.iconRef && this.iconRef.offsetWidth - 43,
    }

    return (
      <div className="vtex-popover relative flex h-100 items-center">
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
          ref={this.boxRef}
        >
          <div className="vtex-popover__content-container shadow-3 mt3 bg-white">
            {children}
          </div>
          <div className="vtex-popover__arrow-up absolute top-0 right-0-ns bg-white dib-ns dn-s" />
        </div>
      </div>
    )
  }

  private handleDocumentMouseUp = (e: any) => {
    const { isBoxOpen } = this.state
    const target = e.target

    if (
      this.boxRef.current &&
      (!this.boxRef.current.contains(target) ||
        target.hasAttribute('closeonclick'))
    ) {

      if (isBoxOpen) { this.setState({ isBoxOpen: false }) }
      this.removeListeners()

      target.dispatchEvent(new Event('closeonclick'))
    }
  }

  private removeListeners = () => {
    document.removeEventListener('mouseup', this.handleDocumentMouseUp)
  }

  private handleHeaderClick = () => {
    document.addEventListener('mouseup', this.handleDocumentMouseUp)

    this.setState({ isBoxOpen: !this.state.isBoxOpen })
  }
}
