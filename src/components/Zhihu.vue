<template lang="html">
	<div :class="['pop-sidebar',{ transform: isTransform }]" v-touch:panleft="hideSidebar" v-show="showHome">
		<side></side>
		<div class="overflow">
			<div :class="['carousel-news',{ replace: isReplace }]">
				<div class="head">
					<i class="iconfont icon-27" @click="toggleSideBar"></i>
					<p class="date">今日热闻</p>
				</div>
				<carousel :loopNow="loopNow"></carousel>
				<news></news>
			</div>
		</div>
	</div>
</template>

<script>

import carousel from './Carousel'
import news from './News'
import side from './Side'

export default {
	data () {
		return {
			isShowPadding:false,
			isTransform:false,
			isReplace:false,
			loopNow:''
		}
	},
	methods: {
		toggleSideBar:function(){
			this.isTransform = !this.isTransform
			this.isReplace = !this.isReplace;
		},
		hideSidebar:function(){
			this.isTransform = false;
			this.isReplace = false
		}
	},
	computed: {
		showHome: function(){
			return this.$store.state.isShow
		}
	},
	mounted() {
		this.loopNow = "go"
	},
	components: {
		carousel, news, side
	}
}
</script>

<style lang="less">
.head{
  display: flex;
  width: 100%;
  height: 1.14rem;
  font-size: .35rem;
  color: #fff;
  background: rgba(2, 143, 214, 0);
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 6;
  transition: all .2s ease;

  .date{
    width:1.7rem;
    font-weight: bold;
    margin-left: 1.7rem;
  }
  .icon-27{
    margin-left: .23rem;
    margin-bottom: .08rem
  }
}

.overflow{
  width:62%;
  overflow:hidden
}
.carousel-news{
  width: 103vw;
  height: 100vh;
  overflow: scroll;
}
.replace{
  overflow-y: hidden;
}


/*动画*/
.pop-sidebar{
  width: calc(100%+62rem);
  display: flex;
  margin-left: -3.97rem;
  transition: all .2s linear
}
.transform{
  transform: translateX(4rem);
}
</style>
