import request from '@/utils/request'
export const getAddress = () => {
  return request.get('/address/list')
}
export const setAddress = () => {
  return request.post('/address/add', {
    name: '张三',
    phone: '18999292929',
    region: [
      {
        value: 782,
        label: '上海'
      },
      {
        value: 783,
        label: '上海市'
      },
      {
        value: 785,
        label: '徐汇区'
      }
    ]
  })
}
export const handelPay = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 20, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...params
  })
}
