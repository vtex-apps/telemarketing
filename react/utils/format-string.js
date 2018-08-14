export const truncateString = str => {
  const MAX_LENGTH = 12
  return str.length <= MAX_LENGTH
    ? str
    : str.substring(0, MAX_LENGTH).concat('...')
}
