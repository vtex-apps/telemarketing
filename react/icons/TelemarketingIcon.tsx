import * as React from 'react'

interface Props {
  /** Size */
  size?: number,
}

const TelemarketingIcon: React.SFC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 21 21"
      fill="none"
      width={props.size}
      height={props.size}
    >
      <use href="#telemarketing" xlinkHref="#telemarketing" />
    </svg>
  )
}
TelemarketingIcon.defaultProps = {
  size: 20,
}

export default TelemarketingIcon
