<template>
  <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="style.css" />
    </head>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#" style="font-size: 30px" @click="$router.push('/')">Team Project</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="item mx-auto" style="font-size: 20px">
            <b-nav-item href="#" @click="$router.push('/user')">사용자 관리</b-nav-item>
            <b-nav-item href="#" @click="$router.push('/department')">부서 관리</b-nav-item>
            <b-nav-item href="#" @click="$router.push('/device')">장비 관리</b-nav-item>
            <b-nav-item href="#" @click="$router.push('/LineChart')">데이터 분석</b-nav-item>
            <b-nav-item href="#" @click="$router.push('/webgl')">Webgl</b-nav-item>
          </b-navbar-nav>
          <b-button variant="primary" style="margin-right: 10px" @click="kakaoLogin">로그인</b-button>
          <b-button variant="danger" @click="kakaoLogout">로그아웃</b-button>
        </b-collapse>
      </b-navbar>
    </div>
  </html>
</template>

<script>
export default {
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email, gender',
        success: this.getProfile
      })
    },
    getProfile(authObj) {
      console.log(authObj)
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account
          console.log(kakao_account)

          alert('로그인 성공')
        }
      })
    },
    // acync login(kakao_account) {
    //   await this.$api("/api/login", {
    //     param: [
    //       {email: kakao_account.email, nickname: kakao_account.profile.nickname},
    //       {nickname: kakao_account.profile.nickname}
    //     ]
    //   })
    // },
    kakaoLogout() {
      window.Kakao.Auth.logout(response => {
        this.$store.commit('user', {})
        alert('로그아웃')
      })
    }
  }
}
</script>
