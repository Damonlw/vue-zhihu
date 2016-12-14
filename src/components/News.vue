<template lang="html">
	<div :class="['content-bg',{newsBgcolor : isBeing}]">
		<div class="container">
			<div class="news-body">
				<ul class="news-ul">
					<li v-for="item in stories" :class="[ dayStatus ? 'night' : 'daytime']" @click="openMessage(item)">
						<p :class="['title',{ changeColor: item.isChange }]">{{ item.title }}</p>
						<div class="news-img">
							<img :src="item.img"/>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="before-news" v-for="beforeNew in beforeNews">
			<div :class="['date-time',{changeBarColor: nightModel}]">{{ beforeNew.date }}</div>
			<ul>
				<li v-for="item in beforeNew.stories" :class="[ dayStatus ? 'night' : 'daytime']" @click="openMessage(item)">
					<p :class="['title',{ changeColor: item.isChange }]">{{ item.title }}</p>
					<div class="news-img">
						<img :src="item.images">
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			isBeing: false,
			dayStatus: false,
			store: [],
			beforeNewsDate:	'',
			lastedDate:'',
			oneDayTime: 86400000
		}
	},
	computed: {
		stories() {
			return this.$store.state.news
		},
		beforeNews() {
			return this.$store.state.beforeNews
		},
		nightModel() {
			return this.$store.state.nightModel
		}
	},
	methods: {
		openMessage:function(item) {
			this.$store.dispatch('getBody', item.id);
			this.$router.push(`/zhihu/${item.id}`);
			this.$store.dispatch('changeColor', item);
		}
	},
	mounted() {
		bus.$on('toggleStatus', ()=> {
			this.isBeing = !this.isBeing;
			this.dayStatus = !this.dayStatus
		});

		const scrollContent = document.querySelector('.carousel-news');
		let [scrollBefore, beforeNum] = [0, Math.floor((scrollContent.scrollTop) / 500)];
		scrollContent.onscroll = () => {
			const scrollAfter = scrollContent.scrollTop;
			if(scrollBefore < scrollAfter) {
				const afterNum = Math.floor((scrollContent.scrollTop) / 200);
				const toBeforeDate = new Date((this.lastedDate - (this.oneDayTime) * afterNum));
				const day = toBeforeDate.getDate() > 9 ? toBeforeDate.getDate() : "0" + toBeforeDate.getDate();
				const month = (toBeforeDate.getMonth() + 1) > 9 ? (toBeforeDate.getMonth() + 1) : "0" + (toBeforeDate.getMonth() + 1);
				const getFinalDate =`${toBeforeDate.getFullYear()}${month}${day}`
				if(beforeNum !== afterNum ) {
					this.beforeNewsDate = getFinalDate;
					this.$store.dispatch('getBeforeData', this.beforeNewsDate);
					beforeNum = afterNum
				}
				scrollBefore = scrollAfter
			}
		}
	},
	updated() {
		this.lastedDate = (this.$store.state.lastedDate);
	}
}
</script>

<style lang="less" scoped>
.content-bg {
	background: #fff;
	transition: background-color .5s linear
}
.newsBgcolor {
	color: #b8b8b8;
	background: #3d3d3d;
}
.container {
	width: 92%;
	padding: 0 4% 1px 4%;

	.news-body {
		width: 5.9rem;
		.news-ul {
			font-size: .27rem;

			.daytime {
				height: 1.7rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;

				&::after {
					content: '';
					width: 5.9rem;
					height: 1rem;
					background: #f6f6f6;
					transform: scaleY(0.03);
					position: absolute;
					bottom: -0.5rem;
					clear: both;
				}
			}
			.night {
				height: 1.7rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;


				&::after {
					content: '';
					width: 5.9rem;
					height: 1rem;
					background: #313131;
					transform: scaleY(0.02);
					position: absolute;
					bottom: -0.5rem;
					clear: both;
				}
			}
		}
	}
}
.title {
	width: 4.2rem;
	height: 1.23rem;
}
.changeColor {
	color: #6b6b6b;
}
.news-img {
	width: 1.51rem;
	height: 1.19rem;

	img {
		width: 100%;
		height: 100%;
	}
}

.before-news {
	padding-bottom: 1px;

	.date-time {
		background-color: rgba(2, 143, 214, 1);
		height: .6rem;
		color: #fff;
		font-size: .27rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color .5s linear 
	}
	.date-time.changeBarColor{
		background-color: #464646;
	}
	ul {
		width: 5.9rem;
		padding: 0 4%;
		font-size: .27rem;

		.daytime {
			height: 1.7rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;

			&::after {
				content: '';
				width: 5.9rem;
				height: 1rem;
				background: #f6f6f6;
				transform: scaleY(0.03);
				position: absolute;
				bottom: -0.5rem;
				clear: both;
			}
		}
		.night {
			height: 1.7rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;


			&::after {
				content: '';
				width: 5.9rem;
				height: 1rem;
				background: #313131;
				transform: scaleY(0.02);
				position: absolute;
				bottom: -0.5rem;
				clear: both;
			}
		}
	}
}

</style>
