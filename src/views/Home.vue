<template>
  <div class="home">
    <img alt="logo" src="../assets/bg.png" />
    <HelloWorld msg="Welcome To Team Project" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style src="@/assets/css/main.css"></style>
