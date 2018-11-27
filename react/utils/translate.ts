export default (id: string, intl: any): string => {
  return intl.formatMessage({ id: `${id}` })
}
