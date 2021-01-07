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

/**
 * Копирует объект и вызывает функцию trim для обрезания пробелов в строках
 * @param {Object} from
 * @param {Object=} to
 * @returns {Object}
 */
export const copyObjectAndTrim = (from, to = {}) => {
  const target = Object.assign({}, to, from);
  Object.keys(target).forEach(key => target[key] = trim(from[key]));
  return target;
}
