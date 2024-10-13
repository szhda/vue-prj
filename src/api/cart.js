import request from '@/utils/request'
export const addCartQuest = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
export const getCartList = () => {
  return request.get('/cart/list')
}
// 更新商品购物车数量
export const getCountRequest = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 删除商品购物车
export const delCartCount = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
