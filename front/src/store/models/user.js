import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  User: {
    id: null,
    name: null,
    userId: null,
    password: null,
    email: null
  }
}

export default {
  state: {
    UserList: [],
    User: { ...stateInit.User },
    InsertedResult: null,
    UpdatedResult: null,
    DeletedResult: null,
    InputMode: null
  },
  getters: {
    UserList: state => state.UserList,
    User: state => state.User,
    UserInsertedResult: state => state.InsertedResult,
    UserUpdatedResult: state => state.UpdatedResult,
    UserDeletedResult: state => state.DeletedResult,
    UserInputMode: state => state.InputMode
  },
  mutations: {
    setUserList(state, data) {
      state.UserList = data
    },
    setUser(state, data) {
      state.User = data
    },
    setInsertedResult(state, data) {
      state.InsertedResult = data
    },
    setUpdatedResult(state, data) {
      state.UpdatedResult = data
    },
    setDeletedResult(state, data) {
      state.DeletedResult = data
    },
    setInputMode(state, data) {
      state.InputMode = data
    }
  },
  actions: {
    // 리스트 조회
    actUserList(context, payload) {
      api
        .get('/serverApi/auth', { params: payload })
        .then(response => {
          const userList = response && response.data && response.data.rows
          context.commit('setUserList', userList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserList.error', error)
          context.commit('setUserList', [])
        })
    },
    // 등록
    actUserInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)
      console.log('action')
      api
        .post('/serverApi/users', payload)
        .then(response => {
          console.log('login', response)
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('UserInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 초기화
    actUserInit(context, payload) {
      context.commit('setUser', { ...stateInit.User })
    },
    // 입력모드
    actUserInputMode(context, payload) {
      context.commit('setInputMode', payload)
    }
  }
}
