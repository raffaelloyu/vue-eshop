<template>
  <div class="param-info" v-if="Object.keys(goodParam).length !== 0">
    <table v-for="(table, index) in goodParam.sizes"
      class="inf-size" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">
          {{td}}
        </td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in goodParam.infos">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="goodParam.image.length !== 0">
      <img :src="goodParam.image" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  data(){
    return{
      counter:0,
      length:0
    }
  },
  props:{
    goodParam:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imgLoad(){
      if(++this.counter === this.length) {
        this.$emit('paramLoaded')
      }
    }
  },
  created() {
    this.length = this.goodParam.image === undefined ? 0 : this.goodParam.image.length
  }
}
</script>

<style scoped>
  .param-info{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table{
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr{
    height: 42px;
  }

  .param-info table tr td{
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }

  .info-param-key{
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }

  .param-value{
    color: #eb4868;
  }

  .info-img img{
    width: 100%;
  }
</style>
