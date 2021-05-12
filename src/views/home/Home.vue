<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll">
        <home-swiper :banners="banners"/>
        <home-reccomend :recommends="recommends"/>
        <home-feature/>
        <tab-control class="tab-control"
                     :titles="titles" @tabClick="tabClick"/>
        <goods-list :goods="showGoods"/>
      </scroll>
    <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeReccomend from "./childComponents/HomeReccomend";
import HomeFeature from "@/views/home/childComponents/HomeFeature";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/content/scroll/Scroll";
import BackTop from "@/components/content/backToTop/BackTop";

import {
  getHomeMultidata,
  getHomeGoods
} from "@/network/home";


export default {
  name: "Home",
  components:{
    HomeReccomend,
    NavBar,
    HomeSwiper,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  computed:{
    showGoods(){
      return this.goods[this.types[this.currentIndex]].list
    }
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page: 0, list:[]},
        'new':{page: 0, list:[]},
        'sell':{page: 0, list:[]},
      },
      titles:['流行','新款','精选'],
      types:['pop','new','sell'],
      currentIndex:0
    }
  },
  created() {
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /*
    *事件监听
    * */
    tabClick(index){
      console.log(index)
      this.currentIndex = index
    },
    backClick(){
      this.$refs.scroll.ScrollTo(0, 0, 500)
    },
    /*
    * 网络请求相关方法
    * */
    getHomeMultiData() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        console.log(this.goods)
      })
    }
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

 .home-nav{
   background-color: var(--color-tint);
   color: white;

   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 9;
 }

 .tab-control{
   position: sticky;
   top: 44px;
   z-index: 999;
 }

 .content{
   position: absolute;
   top: 44px;
   bottom: 49px;
   overflow: hidden;
   left: 0;
   right: 0;
   /*margin-top: 44px;*/
 }
</style>
