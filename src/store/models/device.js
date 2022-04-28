import api from '../apiUtil'

// 초기값 선언
const stateInit = {
  Device: {
    id: null,
    name: null,
    model: null,
    createdAt: null,
    updatedAt: null
  }
}

export default {
  state: {
    DeviceList: [],
    Device: { ...stateInit.Device },
    InsertedResult: null, // 입력처리 후 결과
    UpdatedResult: null, // 수정처리 후 결과
    DeletedResult: null, // 삭제처리 후 결과
    InputMode: null // 입력모드(등록: insert, 수정: update)
  },
  getters: {
    DeviceList: state => state.DeviceList,
    Device: state => state.Device,
    DeviceInsertedResult: state => state.InsertedResult,
    DeviceUpdatedResult: state => state.UpdatedResult,
    DeviceDeletedResult: state => state.DeletedResult,
    DeviceInputMode: state => state.InputMode
  },
  mutations: {
    setDeviceList(state, data) {
      state.DeviceList = data
    },
    setDevice(state, data) {
      state.Device = data
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
    actDeviceList(context, payload) {
      /* 테스트 데이터 세팅
      const DeviceList = [
        {
          id: 1,
          name: 'Edge1',
          model: 'E001',
          createdAt: '2021-12-01T00:00:00.000Z'
        },
        {
          id: 2,
          name: 'Edge2',
          model: 'E002',
          createdAt: '2021-12-01T00:00:00.000Z'
        }
      ]
      context.commit('setDeviceList', DeviceList)
       */

      /* RestAPI 호출 */
      api
        .get('/serverApi/devices', { params: payload })
        .then(response => {
          const deviceList = response && response.data && response.data.rows
          context.commit('setDeviceList', deviceList)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceList.error', error)
          context.commit('setDeviceList', [])
        })
    },
    // 등록
    actDeviceInsert(context, payload) {
      // 상태값 초기화
      context.commit('setInsertedResult', null)

      /* 테스트 데이터 세팅
      setTimeout(() => {
        const insertedResult = 1
        context.commit('setInsertedResult', insertedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
       */

      /* RestAPI 호출 */
      api
        .post('/serverApi/devices', payload)
        .then(response => {
          const insertedResult = response && response.data && response.data.id
          context.commit('setInsertedResult', insertedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceInsert.error', error)
          context.commit('setInsertedResult', -1)
        })
    },
    // 초기화
    actDeviceInit(context, payload) {
      context.commit('setDevice', { ...stateInit.Device })
    },
    // 입력모드
    actDeviceInputMode(context, payload) {
      context.commit('setInputMode', payload)
    },
    // 상세정보 조회
    actDeviceInfo(context, payload) {
      // 상태값 초기화
      context.commit('setDevice', { ...stateInit.Device })

      /* 테스트 데이터 세팅
      setTimeout(() => {
        const DeviceList = [
          {
            id: 1,
            name: 'Edge1',
            model: 'E001',
            createdAt: '2021-12-01T00:00:00.000Z'
          },
          {
            id: 2,
            name: 'Edge2',
            model: 'E002',
            createdAt: '2021-12-01T00:00:00.000Z'
          }
        ]

        let Device = { ...stateInit.Device }
        for (let i = 0; i < DeviceList.length; i += 1) {
          if (payload === DeviceList[i].id) {
            Device = { ...DeviceList[i] }
          }
        }
        context.commit('setDevice', Device)
      }, 300)
       */

      /* RestAPI 호출 */
      api
        .get(`/serverApi/devices/${payload}`)
        .then(response => {
          const device = response && response.data
          context.commit('setDevice', device)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceInfo.error', error)
          context.commit('setDevice', -1)
        })
    },
    // 수정
    actDeviceUpdate(context, payload) {
      // 상태값 초기화
      context.commit('setUpdatedResult', null)

      /* 테스트 데이터 세팅
      setTimeout(() => {
        const updatedResult = 1
        context.commit('setUpdatedResult', updatedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
      */

      /* RestAPI 호출 */
      api
        .put(`/serverApi/devices/${payload.id}`, payload)
        .then(response => {
          const updatedResult = response && response.data && response.data.updatedCount
          context.commit('setUpdatedResult', updatedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceUpdate.error', error)
          context.commit('setUpdatedResult', -1)
        })
    },
    // 삭제
    actDeviceDelete(context, payload) {
      // 상태값 초기화
      context.commit('setDeletedResult', null)

      /* 테스트 데이터 세팅
      setTimeout(() => {
        const deletedResult = 1
        context.commit('setDeletedResult', deletedResult)
      }, 300) // state값의 변화를 감지하기 위하여 일부러 지연 시켰다.
      */

      /* RestAPI 호출 */
      api
        .delete(`/serverApi/devices/${payload}`)
        .then(response => {
          const deletedResult = response && response.data && response.data.deletedCount
          context.commit('setDeletedResult', deletedResult)
        })
        .catch(error => {
          // 에러인 경우 처리
          console.error('DeviceDelete.error', error)
          context.commit('setDeletedResult', -1)
        })
    }
  }
}
