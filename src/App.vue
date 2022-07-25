<template>
  <div id="app">
    <nav></nav>
    <router-view />
  </div>
</template>
<script>
import { getAllAPI } from '@/api'
export default {
  async created () {
    const res = await getAllAPI()
    console.log(res)
  }
}
</script>

<style lang="less"></style>
