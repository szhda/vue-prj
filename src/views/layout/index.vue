<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 设置路由模式 -->
    <van-tabbar active-color="#ee0a24" inactive-color="#000" route>
    <van-tabbar-item to="/home" icon="home-o" >首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="search">分类页</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物页</van-tabbar-item>
    <van-tabbar-item to="/user" icon="contact-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 'home'
    }
  }
}
</script>

<style>
</style>
