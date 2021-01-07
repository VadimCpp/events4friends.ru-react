/**
 * Проверяет переданное значение на соответствие строке и обрезает пробелы в
 * начале и конце строки. Иначе просто возвращает переданное значение.
 * @function trim
 * @param {string} value
 * @returns {(string|any)}
 */
export function trim(value = '') {
  if (typeof value === 'string') {
    return value.trim();
  }
  return value;
}
