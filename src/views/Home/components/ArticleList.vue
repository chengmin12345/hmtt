<template>
  <div>
   <ArticleItem v-for="li in list" :key="li.art_id" :artObj="li"></ArticleItem>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    list: Array
  },
  components: {
    ArticleItem
  }

}
</script>

<style lang="less" scoped>

</style>
