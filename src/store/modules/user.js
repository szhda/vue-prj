import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      console.log(state.userInfo)
      setInfo(obj)
    }
  },
  getters: {},
  actions: {}
}
