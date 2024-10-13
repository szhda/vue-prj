const infoKey = 'shopping_info'
const historyKey = 'history_key'
export const getInfo = () => {
  const result = localStorage.getItem(infoKey)
  return result
    ? JSON.parse(result)
    : {
        token: '',
        userid: ''
      }
}
export const setInfo = (obj) => {
  localStorage.setItem(infoKey, JSON.stringify(obj))
}
export const removeInfo = () => {
  localStorage.removeItem(infoKey)
}
export const getHistoryItem = () => {
  const res = localStorage.getItem(historyKey)
  return res
    ? JSON.parse(res)
    : []
}
export const setHistoryItem = (arry) => {
  localStorage.setItem(historyKey, JSON.stringify(arry))
}
