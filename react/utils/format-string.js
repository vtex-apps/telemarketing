export const truncateString = (str, size) => {
  const MAX_LENGTH = 12

  size = size || MAX_LENGTH

  return str.length <= size ? str : str.substring(0, size - 3).concat('...')
}
