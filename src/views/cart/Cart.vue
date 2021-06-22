<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车<label v-show="length !== 0">({{length}})</label></div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-botton-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/content/scroll/Scroll";
import CartList from "@/views/cart/childComps/CartList";
import CartBottonBar from "@/views/cart/childComps/CartBottonBar";

import {mapGetters} from "vuex"


export default {
  name: "Cart",
  components:{
    CartBottonBar,
    NavBar,
    CartList,
    Scroll
  },
  data(){
    return{
      count:0
    }
  },
  mounted() {
    this.count = this.$store.state.cartList.length
  },
  computed:{
    ...mapGetters({
      length:"cartLenth"
    })
  }
}
</script>

<style scoped>


  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
