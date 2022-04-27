<template>
  <div>
    <div class="text-center" style="margin-top: 200px">
      <b-spinner variant="secondary" style="width: 3rem; height: 3rem" label="Logout..."></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.TokenLoading
    }
  },
  watch: {
    loading(value) {
      if (value === false) {
        // 로그아웃 처리 후 이동
        this.$router.push('/auth/login')
      }
    }
  },
  created() {
    this.$store.dispatch('authLogout')
  }
}
// 라우터 주소는 /auth/logout으로 한다.
// 로그아웃 페이지에 접속하면 스핀되는 이미지를 볼 수 있을 것이다.
// 로그아웃이 처리되는 동안 보여줄 이미지가 있으면 이곳에 넣으면 된다.
</script>
