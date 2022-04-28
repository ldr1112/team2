import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Department: {
    id: null,
    name: null,
    code: null,
    description: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    DepartmentList: [],
    Department: { ...stateInit.Department },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    DepartmentList: state => state.DepartmentList,
    Department: state => state.Department,
    DepartmentInsertedResult: state => state.InsertedResult,
    DepartmentUpdatedResult: state => state.UpdatedResult,
    DepartmentDeletedResult: state => state.DeletedResult,
    DepartmentInputMode: state => state.InputMode
  },
  mutations: {
    setDepartmentList(state, data) {
      state.DepartmentList = data
    },
    setDepartment(state, data) {
      state.Department = data
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
    // 부서 리스트 조회
    actDepartmentList(context, payload) {
      /* 테스트 데이터 세팅 */
      /*
      const departmentList = [
        { id: 1, name: '개발팀', code: 'dev', createdAt: '2021-12-01T00:00:00.000Z' },
        { id: 2, name: '영업팀', code: 'sales', createdAt: '2021-12-01T00:00:00.000Z' }
      ]
      context.commit('setDepartmentList', departmentList)
      */

      /* RestAPI 호출 */
      api
        .get('/serverApi/departments', { params: payload })
        .then(response => {
          const departmentList = response && response.data && response.data.rows
          context.commit('setDepartmentList', departmentList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DepartmentList.error', error)
          context.commit('setDepartmentList', [])
        })
    },
    // 부서 입력
    actDepartmentInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* 테스트 데이터 세팅 */
      /*
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
      */

      /* RestAPI 호출 */
      api
        .post('/serverApi/departments', payload)
        .then(response => {
          // 정상 등록인 경우 처리
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DepartmentInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 부서정보 초기화
    actDepartmentInit(context, payload) {
      context.commit('setDepartment', { ...stateInit.Department })
    },
    // 입력모드 설정
    actDepartmentInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 부서 상세정보 조회
    actDepartmentInfo(context, payload) {
      // 상태값 초기화
      context.commit('setDepartment', { ...stateInit.Department })

      /* 테스트 데이터 세팅 */
      /*
      setTimeout(() => {
        const departmentList = [
          { id: 1, name: '개발팀', code: 'dev', description: '개발팀 테스트', createdAt: '2021-12-01T00:00:00.000Z' },
          { id: 2, name: '영업팀', code: 'sales', description: '영업팀 테스트', createdAt: '2021-12-01T00:00:00.000Z' }
        ]

        let department = { ...stateInit.Department }
        for (let i = 0; i < departmentList.length; i += 1) {
          if (payload === departmentList[i].id) {
            department = { ...departmentList[i] }
          }
        }
        context.commit('setDepartment', department)
      }, 300)
      */

      /* RestAPI 호출 */
      api
        .get(`/serverApi/departments/${payload}`)
        .then(response => {
          const department = response && response.data
          context.commit('setDepartment', department)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DepartmentInfo.error', error)
          context.commit('setDepartment', {})
        })
    },
    // 부서 수정
    actDepartmentUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* 테스트 데이터 세팅 */
      /*
      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
      */

      /* RestAPI 호출 */
      api
        .put(`/serverApi/departments/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DepartmentUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 부서 삭제
    actDepartmentDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* 테스트 데이터 세팅 */
      /*
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
      */

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/departments/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DepartmentDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
