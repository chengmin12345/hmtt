<template>
  <div id="app">
    <nav></nav>
    <router-view />
  </div>
</template>
<script>
export default {
  async created () {
    const res = await new Promise()
    console.log(res)
  }
}
</script>

<style lang="less"></style>
