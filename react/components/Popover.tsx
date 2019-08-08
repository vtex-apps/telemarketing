import React, { ReactNode, useRef, useState, useCallback } from 'react'
import classnames from 'classnames'
import useOutsideClick from '../hooks/useOutsideClick'
import styles from '../telemarketing.css'
import { Overlay } from 'vtex.react-portal'

interface Props {
  /** Function that will display the header */
  renderHeader: () => JSX.Element
  /** Aditional classes for arrows */
  arrowClasses: string
  /** If is mobile or not */
  mobile: boolean
  /** Children */
  readonly children: ReactNode
}

/** Component that shows a content when it´s header is clicked */
const Popover = (props: Props) => {
  const boxRef = useRef<any>(null)
  const iconRef = useRef<any>(null)
  const [isBoxOpen, setBoxOpen] = useState(false)
  const { renderHeader, children, arrowClasses, mobile } = props

  const handleOutsideClick = () => setBoxOpen(false)
  useOutsideClick(boxRef, handleOutsideClick, isBoxOpen)

  const toggleBox = useCallback(() => setBoxOpen(!isBoxOpen), [])

  const boxPositionStyle = mobile
    ? {}
    : {
        right: iconRef.current && iconRef.current.offsetWidth - 43,
      }

  const boxClasses = classnames(
    styles.popoverBox,
    'absolute-ns top-2 z-max bb b--muted-3 fixed-s',
    isBoxOpen ? 'flex' : 'dn',
    {
      'left-0 right-0': mobile,
    }
  )

  return (
    <div
      className={`${
        styles.popoverContainer
      } relative flex h-100 items-center pr4`}
    >
      <div
        className="pointer w-100"
        onMouseDown={toggleBox}
        ref={e => {
          iconRef.current = e
        }}
      >
        {renderHeader()}
      </div>
      <Overlay>
        <div className={boxClasses} style={boxPositionStyle} ref={boxRef}>
          <div
            className={`${
              styles.popoverContentContainer
            } mt3-ns bg-base shadow-3-ns`}
          >
            {children}
          </div>
          <div
            className={`${
              styles.popoverArrowUp
            } absolute top-0 rotate-135 dib-ns dn-s ${arrowClasses}`}
          />
        </div>
      </Overlay> 
    </div>
  )
}

export default Popover
