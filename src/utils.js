export const isFunction = (func) => {
  return typeof func === 'function'
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export const isEmptyObject = (obj) => {
  return isObject(obj) && Object.keys(obj).length === 0
}