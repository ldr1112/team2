<template>
  <div>
    <h2 class="device">장비 관리</h2>
    <div style="margin-bottom: 5px">
      <b-row>
        <b-col style="text-align: left" cols="3">
          <b-input-group class="mt-3">
            <b-form-input v-model="search.name" placeholder="장비이름 검색"></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" @click="searchDeviceList">검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col style="text-align: right">
          <b-button variant="success" @click="onClickAddNew">신규등록</b-button>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-table small hover striped :items="deviceList" :fields="fields">
        <template #cell(createdAt)="row">
          {{ row.item.createdAt.substring(0, 10) }}
        </template>
        <template #cell(updateBtn)="row">
          <b-button size="sm" variant="success" @click="onClickEdit(row.item.id)">수정</b-button>
        </template>
        <template #cell(deleteBtn)="row">
          <b-button size="sm" variant="danger" @click="onClickDelete(row.item.id)">삭제</b-button>
        </template>
      </b-table>
    </div>

    <!-- inform 영역 -->
    <inform />
  </div>
</template>

<script>
import inform from './inform.vue'

export default {
  components: {
    inform: inform
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'id' },
        { key: 'name', label: '이름' },
        { key: 'deviceModelName', label: '장비이름' },
        { key: 'manufacturer', label: '모델명' },
        { key: 'location', label: '설치위치' },
        { key: 'edgeSerialNumber', label: '엣지 시리얼 번호' },
        { key: 'networkInterface', label: '통신 인터페이스' },
        { key: 'createdAt', label: '생성일' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ],
      search: {
        name: null
      }
    }
  },
  computed: {
    deviceList() {
      return this.$store.getters.DeviceList
    },
    insertedResult() {
      return this.$store.getters.DeviceInsertedResult
    },
    updatedResult() {
      return this.$store.getters.DeviceUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.DeviceDeletedResult
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

          // 2. 리스트 재 검색
          this.searchDeviceList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리
      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchDeviceList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리
      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메세지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재 검색
          this.searchDeviceList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('삭제가 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchDeviceList()
  },
  methods: {
    searchDeviceList() {
      this.$store.dispatch('actDeviceList', this.search)
    },
    onClickAddNew() {
      // 신규등록

      // 1. 입력모드 설정
      this.$store.dispatch('actDeviceInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actDeviceInit')

      // 3. 모달 출력
      this.$bvModal.show('modal-device-inform')
    },
    onClickEdit(id) {
      // (수정을 위한)상세정보

      // 1. 입력모드 설정
      this.$store.dispatch('actDeviceInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actDeviceInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-device-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actDeviceDelete', id)
        }
      })
    }
  }
}
</script>

<style src="@/assets/css/main.css"></style>
