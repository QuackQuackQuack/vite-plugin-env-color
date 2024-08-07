/**
 * snakeToCamelCase
 * @param {string} string string
 * @returns {string} string
 */
export function snakeToCamelCase(str: string): string {
  return str.replace(/_/gi, '-').toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase())
}




