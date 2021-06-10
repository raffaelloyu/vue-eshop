<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll ref="scroll" class="content" :probe-type="3">
      <div>
        <detail-swiper :top-images="topImages" @detailSwipperLoaded="swiperLoaded"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :good-param="goodParam" @paramLoaded="paramLoad"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
<!--        <goods-list :goods="recommends"></goods-list>-->
        <detail-recommend-info ref="recommend" :recommend-list="recommends"></detail-recommend-info>
      </div>
    </scroll>
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
import GoodsList from "@/components/content/goods/GoodsList";

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
    DetailCommentInfo
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
      recommends:[]
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
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
    }
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
    height: calc(100% - 44px);
  }
</style>
