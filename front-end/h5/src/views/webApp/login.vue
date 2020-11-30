<template>
  <div class="main" :style="{ backgroundImage: 'url(' + loginBg + ')' }">
    <img :src="logo" class="logo" />
    <div class="center-block">
      <div class="left-part" :style="{ backgroundImage: 'url(' + leftBg + ')' }">
        <div class="login-title">BOE 智慧园区系统</div>
        <div class="login-des">BOE Smart District System</div>
      </div>
      <div class="login-container right-part">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
          <div class="title-container">
            <div class="title">登录平台账号</div>
          </div>

          <el-form-item prop="username">
            <el-input ref="username" v-model="loginForm.username" placeholder="账号" name="username" type="text" autocomplete="on" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" autocomplete="on" @keyup.enter.native="handleLogin" />
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%; " @click.native.prevent="handleLogin">登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script >
// import { Form } from 'element-ui'
import leftBg from './assets/image/leftBg.png'
import loginBg from './assets/image/loginBg.jpg'
// import AccountApi from "@/api/accountApi";
import logo from './assets/image/logo.png'

export default {
  data () {
    return {
      loginRules: {
        username: [{ validator: this.validateUsername, trigger: 'blur' }],
        password: [{ validator: this.validatePassword, trigger: 'blur' }]
      },
      leftBg,
      loginBg,
      logo,
      loading: false,
      passwordType: 'password',
      loginForm: { username: '', password: '' }
    }
  },

  created () {
    window.sessionStorage.clear()
  },
  methods: {
    async handleLogin () {
      console.log(' this.$router', this.$route)
      const id = this.$route.params.id
      this.$router.replace({ name: 'web-app-route', params: { id } })
      // (this.$refs.loginForm).validate(async (valid) => {
      //   if (valid) {
      //     this.loading = true
      //     try {
      //       const res = await axios.post('/login', this.loginForm)
      //       localStorage.setItem('accessToken', 'accessToken')
      //       localStorage.setItem('tokenType', 'accessToken')
      //       localStorage.setItem('token', res.message || '')
      //       this.$router.push({ name: 'home' })
      //       this.loading = false
      //     } catch (e) {
      //       this.loading = false
      //     }
      //   }
      // })
    },

    validateUsername (rule, value, callback) {
      if (!value.trim()) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    },

    validatePassword (rule, value, callback) {
      if (!value.trim()) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style  lang="scss" scoped>
@import './style/login.scss';
</style>
