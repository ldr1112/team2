<template>
  <helloEdukit />
</template>

<script>
import Three from '../js/example'

let helloEdukit = {
  template: '<div ref="webgl"></div>',
  mounted() {
    Three(this.$refs.webgl)
  }
}

export default {
  name: 'Edukit',
  components: {
    helloEdukit
  }
}
</script>

<style scoped></style>
