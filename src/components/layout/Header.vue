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
          <b-navbara-nav v-if="isLoggedin" class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <!-- <em>{{ tokenUserName }}</em> -->
                <!-- <b-button variant="primary" style="margin-right: 10px" @click="kakaoLogin">로그인</b-button>
                <b-button variant="primary" style="margin-right: 10px" @click="kakaoLogin">카카오로그인</b-button> -->
                <b-button variant="danger" @click="$router.push('/auth/logout')">로그아웃</b-button>
              </template>
            </b-nav-item-dropdown>
          </b-navbara-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </html>
</template>

<script>
export default {
  computed: {
    isLoggedin() {
      let login = false
      if (this.$store.getters.TokenUser && this.$store.getters.TokenUser.id > 0) {
        login = true
      }
      return login
    },
    tokenUserName() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.name
    },
    loading() {
      return this.$store.getters.TokenLoading
    }
  },
  // watch: {
  //   loading(value) {
  //     if (value === false) {
  //       // 로그아웃 처리 후 이동
  //       this.$router.push('/auth/login')
  //     }
  //   }
  // },
  // created() {
  //   this.$store.dispatch('authLogout')
  // },
  methods: {
    onClick(path) {
      this.$router.push(path)
    },

    // 카카오로그인-------------------------------------------------------------
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
