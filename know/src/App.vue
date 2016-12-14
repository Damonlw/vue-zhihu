<template>
  <div id="app">
    <cover v-show="showCover" @over="doOver" @loadImgReady="imgReady" ></cover>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
import cover from './components/Cover'
import setting from './components/Setting'

export default {
  name: 'app',
  data () {
    return {
      showCover:false
    }
  },
  components: {
    cover
  },
  methods:{
    imgReady:function(){
      this.showCover = true
    },
    doOver:function(){
      setTimeout(()=> {
        this.showCover=false
      }, 2000)
    }
  }
}



import '../static/js/common.js'

</script>

<style lang="less">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
