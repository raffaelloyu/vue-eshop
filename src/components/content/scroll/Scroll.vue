<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Scroll",
  data(){
    return{
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      pullUpLoad: true,
      mouseWheel: true,
      click: true
    })
  },
  methods:{
    ScrollTo(x, y, time = 300){
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
</style>
