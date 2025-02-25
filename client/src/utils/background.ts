export const isBgColor = (str: string): boolean => {
  const startsWithHash = /^#/
  const isColor = startsWithHash.test(str)

  return isColor
}
