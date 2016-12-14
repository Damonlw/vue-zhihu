<template lang="html">
	<div :class="['content-div', {changeNight: isChange}]">
		<div class="head-img">
			<img :src="showImg">
			<p v-text="pText"></p>
		</div>
		<div class="message" v-html="showMessage"></div>
	</div>
</template>

<script>

export default {
 	computed: {
		showMessage() {
			return this.$store.state.newsMessage.body
		},
		showImg() {
			return this.$store.state.newsMessage.image
		},
		pText() {
			return this.$store.state.newsMessage.title
		},
		isChange() {
			return this.$store.state.nightModel
		}
	}
}

</script>

<style lang="less">
.content-div {
	background: #fff;

	.head-img {
		width: 6.4rem;
		height: 3.7rem;
		position: relative;

		img{
			width: 100%;
			height: 100%;
			border-image-width: 0;
		}
		p{
			width: 5.9rem;
			color: #fdfcff;
			font-size: .35rem;
			font-weight: bold;
			line-height: .4rem;
			padding-left: .3rem;
			position: absolute;
			bottom: .3rem;
		}
	}
	.message {
		font-size: .3rem;

		.content-inner {
			margin: 0 4%;

			.meta {
				display: flex;
				align-items: center;
				margin-bottom: .38rem;
				margin-top: .27rem;

				.avatar {
					margin-right: .1rem;
				}
				.bio {
					color: #969696;
					overflow : hidden;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
				}
				.author {
					white-space:nowrap;
				}
				img{
					width: .4rem;
					height: .4rem;
					border-radius: 4px;
				}
			}
			p {
				margin-bottom: .35rem;

				a {
					color: #2f87af;
					text-decoration: none;
				}
				.content-image {
					width: 100%;
				}
			}
			blockquote {
				color: #969696;
				border-left: .06rem solid #ccc;
				padding-left: .22rem;
				margin: 0 0 .35rem 0;
			}
			.view-more {
				background: #efefef;
				text-align: center;
				margin-bottom: .35rem;
				padding: .07rem 0;

				a {
					color: #bbb;
					text-decoration: none;
				}
			}
			.question {
				.question-title {
					font-size: .32rem;
				}
				.answer {
					border-bottom: 2px solid #f7f7f7;
				}
			}
		}
	}
}
.changeNight {
	background: #6b6b6b;
}

hr {
    display: block;
    -webkit-margin-before: .4rem;
    -webkit-margin-after: .4rem;
    -webkit-margin-start: auto;
    -webkit-margin-end: auto;
    border-style: inset;
    border-width: 1px;
		transform: scaleY(0.2);
}
.content{
	ul, menu, dir {
	    display: block;
	    list-style-type: disc;
	    -webkit-margin-before: 1em;
	    -webkit-margin-after: 1em;
	    -webkit-margin-start: 0px;
	    -webkit-margin-end: 0px;
	    -webkit-padding-start: 40px;
	}
}

</style>
