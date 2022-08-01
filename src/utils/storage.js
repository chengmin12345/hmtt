// 封装本地存储的方式
export const setStorage = (key, value) => {
  localStorage.setItem(key, value)
}
export const getStore = (key) => {
  return localStorage.getItem(key)
}
export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
