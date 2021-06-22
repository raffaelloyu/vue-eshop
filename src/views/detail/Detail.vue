<template>
  <div id="detail">
    <detail-nav-bar ref="navbar" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll ref="scroll" class="content" :probe-type="3" @scroll="scrollContent">
      <div ref="wrapper">
        <detail-swiper ref="base"  class="swiper" :top-images="topImages" @detailSwipperLoaded="swiperLoaded"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="param" class="param" :good-param="goodParam" @paramLoaded="paramLoad"></detail-param-info>
        <detail-comment-info ref="comment" class="comment" :comment-info="commentInfo"></detail-comment-info>
<!--        <goods-list :goods="recommends"></goods-list>-->
        <detail-recommend-info ref="recommend" class="recommend" :recommend-list="recommends"></detail-recommend-info>
      </div>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top class="detail-back-top" @click.native="backClick" v-show="backShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backToTop/BackTop";

import Scroll from "@/components/content/scroll/Scroll";

import {getDetai, getRecommend, Goods, Shop, GoodParam} from "@/network/detail";
import {debounce} from "@/common/utils";
import DetailRecommendInfo from "@/views/detail/childComps/DetailRecommendInfo";

export default {
  name: "Detail",
  components: {
    DetailRecommendInfo,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods:{
        type:Object
      },
      shop:{
        type:Object
      },
      detailInfo:{},
      goodParam:{},
      commentInfo:{},
      recommends:[],
      backShow:false
    }
  },
  mounted() {
    const refresh = debounce(()=>{
      if(this.$refs.scroll){
        this.$refs.scroll.refresh()
      }
      this.getOffsetTops()
    }, 200)
    this.$bus.$on('detailItemImgLoad', () => {
      refresh()
    })
    // this.$bus.$on('itemImgLoad', () => {
    //   this.$refs.scroll.refresh()
    // })
  },
  methods:{
    paramLoad(){
      this.$refs.scroll.refresh()
    },
    swiperLoaded(){
      this.$refs.scroll.refresh()
    },
    imageLoad(){
      this.$refs.scroll.refresh()
    },
    titleClick(index){
      switch (index) {
        case 0:
          this.$refs.scroll.scroll.scrollToElement('.swiper', 200)
          break;
        case 1:
          this.$refs.scroll.scroll.scrollToElement('.param', 200)
          break;
        case 2:
          this.$refs.scroll.scroll.scrollToElement('.comment', 200)
          break;
        case 3:
          this.$refs.scroll.scroll.scrollToElement('.recommend', 200)
          break;
        default:
          break;
      }
    },
    scrollContent(position){
      const currentY = -position.y
      if(currentY < this.themeTops[1]){
        this.$refs.navbar.currentIndex = 0
      } else if(currentY < this.themeTops[2] && currentY > this.themeTops[1]){
        this.$refs.navbar.currentIndex = 1
      } else if(currentY < this.themeTops[3] && currentY > this.themeTops[2]){
        this.$refs.navbar.currentIndex = 2
      } else{
        this.$refs.navbar.currentIndex = 3
      }

      this.backShow = position.y < -1000
    },
    getOffsetTops() {
      this.themeTops = []
      this.themeTops.push(this.$refs.base.$el.offsetTop)
      this.themeTops.push(this.$refs.param.$el.offsetTop)
      this.themeTops.push(this.$refs.comment.$el.offsetTop)
      this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      this.themeTops.push(Number.MAX_VALUE)
      console.log(this.themeTops);
    },
    backClick() {
      this.$refs.scroll.ScrollTo(0, 0, 500)
    },
    addToCart(){
      //1.获取购物车需要展示的信息
      const product = {}
      product.img = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // this.$store.commit('addToCart', product)  //调用mutations
      this.$store.dispatch('addCart', product)  //调用actions
      console.log(this.$store.state.cartList)
      //2.添加购物车
    }
  },
  updated()  {
    // debugger
    this.getOffsetTops()
  },
  created() {
    this.iid = this.$route.params.iid
    getDetai(this.iid).then(res => {
      console.log('detail：', res);
      const data = res.data.result
      this.topImages = res.data.result.itemInfo.topImages

      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)

      this.detailInfo = data.detailInfo

      this.goodParam = new GoodParam(data.itemParams.info, data.itemParams.rule)
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })

    getRecommend().then(res =>{
      console.log('recommend', res);
      this.recommends = res.data.data.list
    })
  }
};

</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-back-top{
    margin-right: 10px;
  }
</style>
