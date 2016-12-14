<template lang="html">
	<div :class="['sidebar',{ change: isChange }]">
		<div class="side-head">
			<div class="head-trait">
				<div>
					<img src="../assets/head.png">
				</div>
				<span>请登录</span>
			</div>
			<div class="bottom-choose">
				<div>
					<i class="iconfont icon-shoucang"></i>
					<p>收藏</p>
				</div>
				<div class="message">
					<i class="iconfont icon-xiaoxi message-position"></i>
					<p>消息</p>
				</div>
				<div @click="goSetting">
					<i class="iconfont icon-settings"></i>
					<p>设置</p>
				</div>
			</div>
		</div>
		<div class="side-bottom">
				<ul class="scroll">
					<transition-group name="flip-list" tag="div">
					<div v-for="(li,index) in liItems" :key="li" :class="[ witchOne ? { active: li.isActive } : { another:li.isActive } ]" @click="change(li)" >
						<li>
							<span v-html="li.text"></span>
							<i :class="['iconfont',li.font ? 'icon-arrow-right' : 'icon-jia']" @click.stop="sort(index,li)"></i>
						</li>
					</div>
				</transition-group>
					<li></li>
					<li></li>
				</ul>
				<div class="footer">
					<div class="inner-div">
						<div>
							<i class="iconfont icon-xiazai"></i>
							<span>离线</span>
						</div>
						<div @click="changeModel">
							<i :class="['iconfont',iconfont]"></i>
							<span class="font-position" v-text="status"></span>
						</div>
					</div>
				</div>
		</div>
		<div :class="['li-cover',{ bgcolor: styleStatus}]"></div>
	</div>
</template>

<script>


export default {
	data () {
		return {
			status:'夜间',
			iconfont:'icon-yejianmoshi',
			isChange:false,
			witchOne:true,
			styleStatus: false,
			liItems:[
				{ text: '<i class="iconfont icon-icon03" ></i> 首页', font: true, isActive: true, index:0 },
				{ text: '用户推荐日报', font: false, isActive: false, index:1 },
				{ text: '电影日报', font: false, isActive: false, index:2 },
				{ text: '不许无聊', font: false, isActive: false, index:3 },
				{ text: '设置日报', font: false, isActive: false, index:4 },
				{ text: '大公司日报', font: false, isActive: false, index:5 },
				{ text: '财经日报', font: false, isActive: false, index:6 },
				{ text: '互联网安全', font: false, isActive: false, index:7 },
				{ text: '开始游戏', font: false, isActive: false, index:8 },
				{ text: '音乐日报', font: false, isActive: false, index:9 },
				{ text: '动漫日报', font: false, isActive: false, index:10 },
				{ text: '体育日报', font: false, isActive: false, index:11 },
			]
		}
	},
	methods:{
		change:function (li) {
			for (let item of this.liItems) {
				item.isActive = false;
			}
			li.isActive = true
		},
		sort:function (index,li) {
			if (li.index !== 0) {
				li.font = true;
				const target = this.liItems.splice(index,1),
			        tempTail = this.liItems.splice(1,10),
				      newItems = this.liItems.concat(target,tempTail);
				this.liItems = newItems;
			}
		},
		changeModel:function () {
			if (this.status == '夜间') {
				this.status = '白天';
				this.iconfont = 'icon-taiyang';
				this.isChange = true;
				this.witchOne = false;
				this.styleStatus = true;
				bus.$emit('toggleStatus');
				this.$store.dispatch('changeNightModel')
			}else {
				this.status = '夜间';
				this.iconfont = 'icon-yejianmoshi';
				this.isChange = false;
				this.witchOne = true;
				this.styleStatus = false;
				bus.$emit('toggleStatus');
				this.$store.dispatch('changeNightModel')
			}
		},
		goSetting() {
			this.$router.push('/setting')
		}
	}
}
</script>

<style lang="less" scoped>


.sidebar{
	width: 4rem;
	height: 100vh;
	background-color: #32414d;
	font-size: .27rem;
	color: #939aa0;
	overflow: hidden;
	transition: background-color .5s linear;

	.side-head{
		padding-left: .2rem;
		border-bottom: 1px solid #1e252b;

		.head-trait{
			width: 2.5rem;
			height: 1rem;
			display: flex;
			align-items: center;
			margin-top: .4rem;

			div{
				width: .74rem;
				height: .74rem;
				border-radius: 50%;
				overflow: hidden;

				img{
					height: 100%
				}
			}
			span{
				margin-left:.22rem
			}
		}

		.bottom-choose{
			width: 3rem;
			height: .8rem;
			display: flex;
			justify-content: space-between;;

			div{
				p{
					font-size: .2rem
				}
			}

			.message{
				padding-top: .05rem;
				.message-position{
					font-size: .35rem;
					padding-left: 2px;
				}
			}
		}
	}

	.side-bottom{
		overflow: hidden;

		.scroll{
			height: 7.9rem;
			overflow:scroll;
			margin-right: -.13rem;

			li{
				width: 3.15rem;
				height: .8rem;
				padding-left: .2rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			div.active{
				color: #fff;
				background-color: #1e252b;
			}
			div.another{
				color: #fff;
				background-color: #191919;
				transition: background-color .5s linear
			}
		}
	}

	.footer{
		height: 1.4rem;
		padding-left: .2rem;

		.inner-div{
			width: 3rem;
			height: 1.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;

			div{
				span{
					position: relative;
					top: -.1rem;
				}
				.font-position{
					top: -.165rem;
				}
			}
		}
	}
	.li-cover{
		width: 3.9rem;
		height: .6rem;
		background-color: rgba(50, 65, 77, 0.5);
		border: transparent;
		position: absolute;
		bottom: 1.2rem;
		transition: background-color .7s linear;
	}
	.li-cover.bgcolor{
		background-color: rgba(34, 34, 34, 0.5);
	}
}

.sidebar.change{
	background-color: #222222;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
