import React, { Component, ReactNode } from 'react'
import { path } from 'ramda'
import { withRuntimeContext } from 'render'

interface Props {
  /** Function that will display the header */
  renderHeader: () => any,
  readonly children: ReactNode
}

/** Component that shows a content when it´s header is clicked */
export class Popover extends Component<Props> {
  public boxRef: any = React.createRef()

  public state = {
    isBoxOpen: false,
  }

  private iconRef: any

  public componentWillUnmount() {
    this.removeListeners()
  }

  private handleHeaderClick = () => {
    document.addEventListener('mouseup', this.handleDocumentMouseUp)

    this.setState({ isBoxOpen: !this.state.isBoxOpen })
  }

  public render() {
    const { renderHeader, children } = this.props
    const mobile = path(['__RUNTIME__', 'hints', 'mobile'], global)

    const boxPositionStyle = mobile ? {} : {
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
          className={`vtex-popover__box absolute top-2 z-max ${
            this.state.isBoxOpen ? 'flex' : 'dn'
            }`}
          style={boxPositionStyle}
          ref={this.boxRef}
        >
          <div className="vtex-popover__content-container shadow-3 mt3-ns mt2-s bg-base">
            {children}
          </div>
          <div className={`vtex-popover__arrow-up absolute top-0 rotate-135 dib-ns dn-s ${this.props.arrowClasses}`} />
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
  
}

export default withRuntimeContext(Popover)
