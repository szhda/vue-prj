<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar
      title="用户登录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 底部 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="phone">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="picCode" >
          <!-- 只有获取到数据才显示 -->
          <img :src="picUrl" alt="" @click = "getImage" v-if="picKey">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="msgCode">
          <button @click="getCode">
            {{ seconds === totalTime? '获取验证码' : seconds + '秒之后重新获取'}}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
  </div>
</div>
</template>

<script>
import { getImageCode, getMsgCode, userLogin } from '@/api/login'
export default {
  name: 'loginIndex',
  data () {
    return {
      picKey: '',
      picUrl: '',
      picCode: 'WWWW',
      totalTime: 60,
      seconds: 60,
      timer: null,
      phone: '15572364068',
      msgCode: ''
    }
  },
  async created () {
    this.getImage()
  },
  methods: {
    async getImage () {
      const { data: { base64, key } } = await getImageCode()
      console.log(base64)
      console.log(key)
      this.picKey = key
      this.picUrl = base64
    },
    vaildFn () {
      if (!/^1[3-9]\d{9,10}$/.test(this.phone)) {
        this.$toast('手机号码格式出错')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('验证码出错')
        return false
      }
      return true
    },
    destroyed () {
      clearInterval(this.timer)
    },
    async getCode () {
      if (!this.vaildFn()) return
      // 节流
      if (this.timer) return
      const res = await getMsgCode(this.picCode, this.picKey, this.phone)
      this.$toast('发送成功，请注意查收')
      console.log(res)
      this.timer = setInterval(() => {
        this.seconds--
        if (this.seconds <= 0) {
          clearInterval(this.timer)
          this.seconds = 60
        }
      }, 1000)
    },
    async login () {
      if (!this.vaildFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await userLogin(this.phone, this.msgCode)
      console.log(res)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      const nextUrl = this.$route.query.backUrl || '/'
      this.$router.replace(nextUrl)
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
