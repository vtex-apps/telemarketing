import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRuntimeContext } from 'render'

/** Component that shows a content when it´s header is clicked*/
class Popover extends Component {
  static propTypes = {
    /** Function that will display the header */
    renderHeader: PropTypes.func.isRequired,
    arrowClasses: PropTypes.string,
    /**  Children that will be rendered inside this Popover*/
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
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
    const { arrowClasses, renderHeader, children, runtime: { hints: { mobile } } } = this.props

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
          className={`vtex-popover__box absolute top-2 z-max bb b--muted-3 ${
            this.state.isBoxOpen ? 'flex' : 'dn'
            }`}
          style={boxPositionStyle}
          ref={this.boxRef_}
        >
          <div className="vtex-popover__content-container mt3-ns mt2-s bg-base shadow-3-ns">
            {children}
          </div>
          <div className={`vtex-popover__arrow-up absolute top-0 rotate-135 dib-ns dn-s ${this.props.arrowClasses}`} />
        </div>
      </div>
    )
  }
}

export default withRuntimeContext(Popover)
