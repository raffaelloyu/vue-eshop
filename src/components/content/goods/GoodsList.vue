<template>
<div class="goods">
  <goods-list-item v-for="item in goods" :goods-item="item" :total="goods.length"/>
</div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  components:{
    GoodsListItem
  },
  name: "GoodsList",
  props:{
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods{
    display: flex;  /*内容塞入一行*/
    flex-wrap: wrap; /*nowrap不包裹的话在一行 wrap的话根据内容的宽度来*/
    justify-content: space-around;
  }


</style>
