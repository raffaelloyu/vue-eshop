<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-show="!isActive" ><slot name="item-icon"></slot></div>
    <div v-show="isActive"><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data(){
      return{
      }
    },
    computed:{
      isActive() {
        // console.log(this.$route.path)
        // console.log(this.path)
        // console.log(this.$route.path.indexOf(this.path) !== -1)
        // console.log('--------------------------')
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color : this.activeColor} : {}
      }
    },
    methods:{
      itemClick(){
        // console.log('click');
        this.isActive = true
        if(this.$route.path !== this.path)
          this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
.tab-bar-item{
  flex:1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width:24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
