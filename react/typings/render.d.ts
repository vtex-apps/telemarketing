declare module 'render' {
  export function withSession(s: {}): (d: {}) => any
  export function withRuntimeContext(s: {}): (d: {}) => any
  export const Link
}