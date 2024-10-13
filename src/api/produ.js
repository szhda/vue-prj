import request from '@/utils/request'
export const getProductList = (paramsObj) => {
  const { categoryId, goodsName, page } = paramsObj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
// 获取商品详情数据
export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId: goodsId
    }
  })
}
// 获取用户评论
export const getProCommments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId: goodsId,
      limit: limit
    }
  })
}
