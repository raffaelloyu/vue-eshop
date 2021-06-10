<template>
    <swiper class="detail-swiper" >
      <swiper-item v-for="item in topImages">
        <img :src="item" @load="imgLoaded">
      </swiper-item>
    </swiper>
</template>

<script>
import Swiper from "@/components/common/swiper/Swiper";
import SwiperItem from "@/components/common/swiper/SwiperItem";

export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return{
      isLoad:false
    }
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    imgLoaded(){
      if(!this.isLoad) {
        this.$emit('detailSwipperLoaded')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
