<template>
  <div>
    <b-modal id="modal-user-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="code" label-cols="3">
          <b-form-input id="id" v-model="user.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="user.name"></b-form-input>
        </b-form-group>
        <b-form-group label="부서" label-for="department" label-cols="3">
          <b-form-select v-model="selected" class="mb-2">
            <b-form-select-option :value="null">--부서를 선택해주세요--</b-form-select-option>
            <b-form-select-option value="a">개발 부서</b-form-select-option>
            <b-form-select-option value="b">공장관리 부서</b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="아이디" label-for="userid" label-cols="3">
          <b-form-input id="userid" v-model="user.userid"></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호" label-for="password" label-cols="3">
          <b-form-input
            v-if="inputMode === 'insert'"
            id="password"
            v-model="user.password"
            type="password"
          ></b-form-input>
          <b-button v-if="inputMode === 'update'" variant="danger">비밀번호 변경</b-button>
        </b-form-group>
        <b-form-group label="권한" label-for="auth" label-cols="3">
          <b-form-radio-group id="auth" v-model="user.role" :options="userRole.options" />
        </b-form-group>
        <b-form-group label="이메일" label-for="email" label-cols="3">
          <b-form-input id="email" v-model="user.email"></b-form-input>
        </b-form-group>
        <b-form-group label="전화번호" label-for="phone" label-cols="3">
          <b-form-input id="phone" v-model="user.phone"></b-form-input>
        </b-form-group>
        <b-form-group v-if="inputMode === 'update'" label="등록일" label-for="createdAt" label-cols="3">
          <b-form-input id="createdAt" :value="getCreatedAt" disabled></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: null,
        departmentId: null,
        name: null,
        userid: null,
        password: null,
        role: null,
        email: null,
        phone: null,
        updatedPwDate: null,
        createdAt: null
      },
      userRole: {
        default: 'member', // 기본값
        options: [
          { value: 'leader', text: '팀장' },
          { value: 'member', text: '팀원' }
        ]
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.User
    },
    inputMode() {
      return this.$store.getters.UserInputMode
    },
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '사용자정보 입력'
      } else if (this.inputMode === 'update') {
        title = '사용자정보 수정'
      }

      return title
    },
    getCreatedAt() {
      return this.user.createdAt && this.user.createdAt.substring(0, 10)
    },
    departmentList() {
      // 부서정보 출력
      return this.$store.getters.DepartmentList
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.user = { ...value }

      this.setDefaultValues() // 기본값 세팅
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.user = { ...this.infoData }

    this.setDefaultValues() // 기본값 세팅

    this.$store.dispatch('actDepartmentList') // 부서정보 조회
  },
  methods: {
    onSubmit() {
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actUserInsert', this.user) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actUserUpdate', this.user) // 수정 실행
      }
    },
    setDefaultValues() {
      // 기본값 세팅
      if (this.inputMode === 'insert') {
        this.user.role = this.userRole.default // 사용자 권한
      }
    }
  }
}
</script>

<style src="@/assets/css/main.css"></style>
