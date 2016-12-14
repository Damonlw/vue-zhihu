<template lang="html">
  <div class="setting">
		<div class="nav-head">
			<div class="left-arrow" @click="returnBack"></div>
			<span>设置</span>
		</div>
		<div class="white-bar">
			<div class="headtrait">
				<img src="../assets/head.png" >
			</div>
			<span class="my-info">我的资料</span>
			<div class="right-arrow"></div>
		</div>
		<div class="white-bar">
			<span>自动离线下载</span>
			<div class="swicth">
				<div :class="['blue-bg', {scale: isScale}]"></div>
				<div :class="['switch-btn', {switchStatus: isSwitch}]" @click="switcher"></div>
			</div>
		</div>
		<div class="prompt">
			<p>仅Wi-Fi下可用，自动下载最新内容</p>
		</div>
		<ul class="go-evaluate">
			<li>
				<span>移动网络不下载图片</span>
				<div class="swicth">
					<div :class="['blue-bg', {scale: isDownScale}]"></div>
					<div :class="['switch-btn', {switchStatus: isDownSwitch}]" @click="onDownSwitcher"></div>
				</div>
			</li>
			<li>
				<span>大字号</span>
				<div class="swicth">
					<div :class="['blue-bg', {scale: isFontScale}]"></div>
					<div :class="['switch-btn', {switchStatus: isFontSwitch}]" @click="onFontSwitcher"></div>
				</div>
			</li>
		</ul>
		<div class="white-bar">
			<span class="">消息推送</span>
			<div class="swicth">
				<div :class="['blue-bg', {scale: isMessageScale}]"></div>
				<div :class="['switch-btn', {switchStatus: isMessageSwitch}]" @click="onMessageSwitcher"></div>
			</div>
		</div>
		<ul class="go-evaluate margin-top">
			<li>
				<span>去好评</span>
				<div class="right-arrow"></div>
			</li>
			<li>
				<span>去吐槽</span>
				<div class="right-arrow"></div>
			</li>
		</ul>
		<div class="white-bar">
			<span class="">清楚缓存</span>
		</div>
  </div>
</template>

<script>
export default {
	data () {
		return {
			isSwitch:true,
			isScale:true,
			isDownScale:false,
			isDownSwitch:false,
			isFontScale:false,
			isFontSwitch:false,
			isMessageScale:true,
			isMessageSwitch:true
		}
	},
	methods: {
		switcher() {
			this.isSwitch = !this.isSwitch;
			this.isScale = !this.isScale;
		},
		onDownSwitcher(){
			this.isDownSwitch = !this.isDownSwitch;
			this.isDownScale = !this.isDownScale;
		},
		onFontSwitcher() {
			this.isFontSwitch = !this.isFontSwitch;
			this.isFontScale = !this.isFontScale;
		},
		onMessageSwitcher() {
			this.isMessageSwitch = !this.isMessageSwitch;
			this.isMessageScale = !this.isMessageScale;
		},
		returnBack() {
			this.$router.push('/')
		}
	}
}
</script>

<style lang="less">
.setting {
	width: 100vw;
	height: 100vh;
	background: #f8f8f8;
	font-size: .3rem;

	.nav-head {
		height: 1.1rem;
		font-size: .35rem;
		color: #fff;
		background-color: #00a2ed;
		display: flex;
		align-items: center;

		.left-arrow {
			width: 0.25rem;
			height: 0.25rem;
			border: 1px solid #fff;
			border-right: 0;
			border-bottom: 0;
			transform: rotate(-45deg);
			margin-left: .3rem;
		}
		span {
			margin-left: 41%;
			transform: translateX(-41%);
		}
	}

	.white-bar {
		height: 0.8rem;
		background-color: #fff;
		border-top: 1px solid #ebebed;
		padding: 0 3.9%;
		margin-top: .3rem;
		border-bottom: 1px solid #ebebed;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.prompt {
		height: .5rem;
		padding: .1rem 5.5% 0 5.5%;
		color: #ccc;
		font-size: .2rem;
	}

	.go-evaluate {
		border-top: 1px solid #ebebed;
		border-bottom: 1px solid #ebebed;
		background: #fff;
		padding-left: 3.9%;

		li {
			display: flex;
			height: 0.8rem;
			align-items: center;
			justify-content: space-between;
			padding-right: 3.9%;
		}
		li:first-child {
			border-bottom: 1px solid #ebebed;
		}
	}
	.margin-top {
		margin-top: .3rem;
	}
}
.headtrait {
	width: 0.7rem;
	height: 0.7rem;
	border-radius: 50%;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
	}
}
.my-info {
	margin-left: -3.3rem;
}
.right-arrow {
	width: 0.15rem;
	height: 0.15rem;
	border: 2px solid #c9c9cb;
	border-left: 0;
	border-bottom: 0;
	transform: rotate(45deg);
}
.swicth {
	width: 1rem;
	height: 0.5rem;
	border-radius: ~'50% / 100%';
	border: 1px solid #ccc;
	transition: all 0.1s linear;
	position: relative;

	.blue-bg {
		width: 0rem;
		height: 0.5rem;
		border-radius: ~'50% / 100%';
		background-color: #00a2ed;
		transform-origin: left;
		transform:scale(0);
		transition: all .1s linear;
	}
	.blue-bg.scale {
		width: 1rem;
		height: 0.5rem;
		transform:scale(1);
	}
	.switch-btn {
		width: 0.48rem;
		height: 0.48rem;
		border-radius: 50%;
		background-color: #fff;
		border: 1px solid #ebebed;
		box-shadow: 1px 1px 40px 1px #ebebed;
		position: absolute;
		top: 0;
		left: 0;
		transition:  all 0.1s linear;
	}
	.switch-btn.switchStatus {
		left: 0.47rem;
	}
}
</style>
