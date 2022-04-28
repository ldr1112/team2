<template>
  <div>
    <h1 style="margin-top: 30px; margin-bottom: 30px">대시보드</h1>
    <div v-if="chartData" class="line">
      <line-chart :chart-data="chartData"></line-chart>
    </div>
    <div v-if="chartData" class="line">
      <line-chart :chart-data="chartData"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/chart/lineChart'

export default {
  components: {
    'line-chart': LineChart
  },
  data() {
    return {
      chartData: null,
      chartData1: null
    }
  },
  mounted() {
    this.makeChartData()
    this.makeChartData1()
  },
  methods: {
    makeChartData() {
      this.chartData = {
        labels: ['1sec', '2sec', '3sec', '4sec', '5sec'],
        datasets: [
          {
            label: '장비1',
            data: [100, 300, 130, 150, 110],
            backgroundColor: '#F7A4A47f',
            borderColor: 'rgb(255, 153, 153)',
            borderWidth: 5
          },
          {
            label: '장비2',
            data: [50, 200, 230, 300, 230],
            backgroundColor: '#D9A4F77f',
            borderColor: '#AA29F5',
            borderWidth: 5
          },
          {
            label: '장비3',
            data: [100, 150, 180, 200, 150],
            backgroundColor: '#29F59C7f',
            borderColor: '#29F59C',
            borderWidth: 5
          }
        ]
      }
    },
    makeChartData1() {
      this.chartData1 = {
        labels: ['1sec', '2sec', '3sec', '4sec', '5sec'],
        datasets: [
          {
            label: '장비1',
            data: [200, 300, 130, 150, 110],
            backgroundColor: '#F7A4A47f',
            borderColor: 'rgb(255, 153, 153)',
            borderWidth: 5
          },
          {
            label: '장비2',
            data: [50, 200, 230, 300, 230],
            backgroundColor: '#D9A4F77f',
            borderColor: '#AA29F5',
            borderWidth: 5
          },
          {
            label: '장비3',
            data: [100, 150, 180, 200, 150],
            backgroundColor: '#29F59C7f',
            borderColor: '#29F59C',
            borderWidth: 5
          }
        ]
      }
    }
  }
}
</script>
<style src="@/assets/css/main.css"></style>
