<template>
  <div>
    <div>
      <b-row align-h="center">
        <b-col cols="4">
          <b-card class="join" title="회원가입">
            <b-form-group label-cols="4" label-cols-lg="3" label="아이디" label-for="input-userid">
              <b-form-input id="input-userid" v-model="user.userId"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="패스워드" label-for="input-password">
              <b-form-input id="input-password" v-model="user.password" type="password"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="이름" label-for="input-name">
              <b-form-input id="input-name" v-model="user.name" type="name"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="이메일" label-for="input-email">
              <b-form-input id="input-email" v-model="user.email" type="email"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="">
              <b-button variant="success" class="join_okbtn" @click="onClickAddNew">가입</b-button>
              <b-button variant="danger" @click="$router.push('/auth/login')">취소</b-button>
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userId: null,
        password: null,
        name: null,
        email: null
      }
    }
  },
  computed: {
    userList() {
      return this.$store.getters.UserList
    },
    insertedResult() {
      return this.$store.getters.UserInsertedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리

      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
          this.$router.push('/auth/login')
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.fields !== null) {
        this.$router.push('/auth/login')
      }
    },
    onClickAddNew() {
      // 신규등록
      console.log('test')
      this.$store.dispatch('actUserInsert', this.user)
    }
  }
}
</script>

<style src="@/assets/css/main.css"></style>
