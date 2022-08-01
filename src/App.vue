<template>
  <div id="app">
    <keep-alive exclude="searchChannel,SearchResult,articleDetail,UserEdit">
      <router-view />
    </keep-alive>

  </div>
</template>
<script>
export default {

}
</script>

<style lang="less"></style>
