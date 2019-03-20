import {
  DependencyList,
  EffectCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react'

type MediaQueryObject = {
  [key: string]: string | number | boolean
}
type Effect = (effect: EffectCallback, deps?: DependencyList) => void

const camelToHyphen = (str: string) =>
  str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).toLowerCase()

const objectToString = (query: string | MediaQueryObject) => {
  if (typeof query === 'string') return query
  return Object.entries(query)
    .map(([feature, value]) => {
      feature = camelToHyphen(feature)
      if (typeof value === 'boolean') {
        return value ? feature : `not ${feature}`
      }
      if (typeof value === 'number' && /[height|width]$/.test(feature)) {
        return `(${feature}: ${value}em)`
      }
      return `(${feature}: ${value})`
    })
    .join(' and ')
}

const createUseMedia = (effect: Effect) => (
  rawQuery: string | MediaQueryObject,
  defaultState: boolean = false
) => {
  const [state, setState] = useState(defaultState)
  const query = objectToString(rawQuery)
  effect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    const onChange = () => {
      if (!mounted) return
      setState(!!mql.matches)
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

export const useMedia = createUseMedia(useEffect)
export const useMediaLayout = createUseMedia(useLayoutEffect)
export const presets = {
  /** < 1280 */
  desktop: { minWidth: 8.1 },
  /** < 1024 - 1280  */
  laptop: { minWidth: 64.1, maxWidth: 80 },
  /** < 768 - 1024  */
  tablet: { minWidth: 48.1, maxWidth: 64 },
  /** < 480 - 768  */
  tabletLowRes: { minWidth: 30.1, maxWidth: 48 },
  /** > 480  */
  mobile: { maxWidth: 30 },
}

export default useMedia
