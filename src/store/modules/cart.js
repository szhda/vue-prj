import { getCartList, getCountRequest, delCartCount } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
      console.log('购物车数据设置成功')
    },
    toggleChecked (state, goodsId) {
      //   console.log(goodsId)
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      //   console.log(goods)
      goods.isChecked = !goods.isChecked
    },
    toggleAllChecked (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, value }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId)
      obj.goods_num = value
    }
  },
  actions: {
    async getCartListData (contexts) {
      const { data } = await getCartList()
      data.list.forEach(element => {
        element.isChecked = true
      })
      contexts.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsId, value, skuId } = obj
      context.commit('changeCount', {
        goodsId,
        value
      })
      await getCountRequest(goodsId, value, skuId)
    },
    async delSelect (context) {
      // 发送请求后端删除购物车商品
      const cartIds = context.getters.getCartList.map(item => item.id)
      await delCartCount(cartIds)
      // 再次获取新的购物车数据
      await context.dispatch('getCartListData')
    },
    loginOut (context) {
      // 清空购物车数据和用户数据
      context.commit('setCartList', [])
      context.commit('user/setUserInfo', {}, { root: true })
    }
  },
  getters: {
    // 商品总数  / 选中的商品列表  /   选中的商品总数  /   选中的商品总价
    getCartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    getCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    getCheckedCartTotal (state, getters) {
      return getters.getCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    getCheckedCartTotalPrice (state, getters) {
      return getters.getCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    isEveryChecked (state) {
      return state.cartList.every(item => item.isChecked === true)
    }
  }
}
