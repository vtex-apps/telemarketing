import { compose, includes, pathOr } from 'ramda'

export default function isMyVtex() {
  return compose(
    includes('myvtex.com'),
    pathOr('', ['location', 'hostname'])
  )(window)
}
