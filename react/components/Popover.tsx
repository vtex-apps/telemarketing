import React, { ReactNode, useRef, useState, useCallback } from 'react'
import classnames from 'classnames'
import { useRuntime } from 'vtex.render-runtime'
import useOutsideClick from '../hooks/useOutsideClick'
import styles from '../telemarketing.css'

interface Props {
  /** Function that will display the header */
  renderHeader: () => JSX.Element
  arrowClasses: string
  readonly children: ReactNode
}

/** Component that shows a content when it´s header is clicked */
const Popover = (props: Props) => {
  const boxRef = useRef<any>(null)
  const iconRef = useRef<any>(null)
  const [isBoxOpen, setBoxOpen] = useState(false)
  const { renderHeader, children, arrowClasses } = props

  const {
    hints: { mobile },
  } = useRuntime()

  const handleOutsideClick = () => setBoxOpen(false)
  useOutsideClick(boxRef, handleOutsideClick, isBoxOpen)

  const handleClick = useCallback(() => setBoxOpen(true), [])

  const boxPositionStyle = mobile
    ? {}
    : {
        right: iconRef.current && iconRef.current.offsetWidth - 43,
      }

  const boxClasses = classnames(
    styles.popoverBox,
    'absolute top-2 z-max bb b--muted-3',
    isBoxOpen ? 'flex' : 'dn'
  )

  return (
    <div
      className={`${
        styles.popoverContainer
      } relative flex h-100 items-center pr4`}
    >
      <div
        className="pointer w-100"
        onClick={handleClick}
        ref={e => {
          iconRef.current = e
        }}
      >
        {renderHeader()}
      </div>
      <div className={boxClasses} style={boxPositionStyle} ref={boxRef}>
        <div
          className={`${
            styles.popoverContentContainer
          } mt3-ns mt2-s bg-base shadow-3-ns`}
        >
          {children}
        </div>
        <div
          className={`${
            styles.popoverArrowUp
          } absolute top-0 rotate-135 dib-ns dn-s ${arrowClasses}`}
        />
      </div>
    </div>
  )
}

export default Popover
