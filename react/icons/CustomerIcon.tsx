import * as React from 'react'

interface Props {
  /** Color */
  color?: string,
  /** Size */
  size?: number,
}

const CustomerIcon: React.SFC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={props.size}
      height={props.size}
      viewBox="0 0 21 21"
      fill="none"
      color={props.color}
    >
      <use href="#customer" xlinkHref="#customer" />
    </svg>
  )
}

CustomerIcon.defaultProps = {
  size: 20,
  color: 'white',
}

export default CustomerIcon
