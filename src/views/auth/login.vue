<template>
  <div>
    <div>
      <b-row align-h="center">
        <b-col cols="4">
          <b-card class="login" title="로그인">
            <b-form-group label-cols="4" label-cols-lg="3" label="아이디" label-for="input-userId">
              <b-form-input id="input-userId" v-model="userId"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="패스워드" label-for="input-password">
              <b-form-input id="input-password" v-model="password" type="password"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="">
              <b-button variant="success" :disabled="loading" class="login_btn" @click="onSubmit"
                ><b-spinner v-if="loading" small></b-spinner> 로그인</b-button
              >
              <b-button variant="primary" :disabled="loading" @click="$router.push('/auth/join')"
                ><b-spinner v-if="loading" small></b-spinner> 회원가입</b-button
              >
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {
      userId: null,
      password: null
    }
  },
  computed: {
    tokenUser() {
      return this.$store.getters.TokenUser
    },
    loading() {
      return this.$store.getters.TokenLoading
    },
    error() {
      return this.$store.getters.TokenError
    }
  },
  watch: {
    tokenUser(value) {
      if (value && value.id && value.id > 0) {
        // 로그인이 완료된 상황
        this.$router.push('/') // 메인 페이지 이동
      }
    },
    error(errValue) {
      if (errValue !== null) {
        // 메세지 출력
        this.$bvToast.toast('아이디/비밀번호를 확인해 주세요.', {
          title: '로그인 에러',
          variant: 'danger',
          solid: true
        })
      }
    }
  },
  created() {
    // 이미 토큰을 가지고 있는 경우 처리를 위한 로직
    const token = window.localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      const today = new Date()
      const expDate = new Date(decodedToken.exp * 1000)

      if (expDate && expDate >= today) {
        // 토큰이 유효한 경우
        this.$router.push('/') // 메인 페이지 이동
      } else {
        // 토큰이 만료된 경우
        window.localStorage.removeItem('token') // 토큰 삭제
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('authLogin', { userId: this.userId, password: this.password })
    }
  }
}
</script>

<style src="@/assets/css/main.css"></style>
