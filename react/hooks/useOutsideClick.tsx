import { useLayoutEffect } from 'react'

const useOutsideClick = (
  ref: React.MutableRefObject<any>,
  handler: any,
  when: boolean
) => {
  const handle = (e: any) =>
    ref && ref.current && !ref.current.contains(e.target) && handler(e)

  useLayoutEffect(() => {
    when && document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [when])
}

export default useOutsideClick
