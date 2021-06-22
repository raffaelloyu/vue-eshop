import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
Vue.use(Vuex)

const state = {
  cartList: []
}

export default new Vuex.Store({
  state,
  mutations:mutations,
  actions:actions,
  modules: {
  },
  getters:{
    cartLenth(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    },
    cartCount(state, getters) {
      return getters.cartList.length
    }
  }
})
