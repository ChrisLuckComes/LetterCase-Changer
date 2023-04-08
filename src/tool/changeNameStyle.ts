/**
 * @desc change camelCase name style to underline.
 * @param str
 * @returns string
 */
export function camelCaseToUnderLine(str: string) {
  return str
    .replace(/(?<=.)[A-Z]/g, (match) => `_${match}`)
    .replace(/[a-z]/g, (match) => match.toUpperCase());
}

/**
 * change underline name style to camelCase.
 * @param str
 * @returns
 */
export function underlineToCamelCase(str: string) {
  return str.replace(/[_][a-z]/g, (match) => match.toUpperCase());
}
