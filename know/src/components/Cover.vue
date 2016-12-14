<template lang="html">
  <div class="cover">
  	<img class="cover-img" :src="imgSrc" />

    <div v-show="showBottom">
      <p class="cover-title" v-text="textTitle"></p>
      <div class="cover-bottom">
        <div class="border-circle">
          <div class="circle-process">
            <div class="wrapper left">
              <div :class="['circle','left-circle',{transformLeft:isLeft}]"></div>
            </div>
            <div class="wrapper right">
              <div :class="['circle','right-circle',{transformRight:isRight}]"></div>
            </div>
          </div>
        </div>
        <div class="cover-font">
          <p>知乎日报</p>
          <p>每天三次，每次七分钟</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>


export default {
	name:'cover',
	data () {
		return {
			imgSrc:'',
			isLeft:false,
			isRight:false,
      textTitle:'',
      showBottom:false
		}
	},
  created(){
    const loadImg = new Promise((resolve, reject) => {
      $.ajax({
        url:'/api/4/start-image/1080*1776',
        type:'GET',
        dataType:'JSON',
        success:(data)=>{
          this.imgSrc=data.img.replace(/(https?:\/\/)?(.*)\.zhimg\.com/, '/$2/zhimg');
          this.textTitle=data.text;
          this.$emit('loadImgReady');
          resolve();
        }
      })
		});

    const setTimeOut =new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.isLeft=true
      }, 400)
      setTimeout(()=> {
        this.isRight = true;
        resolve();
      }, 1400)
    });
    const showBottomImg = new Promise((resolve, reject) => {
      setTimeout(()=> {
        this.showBottom = true;
        resolve();
      }, 350);
    });
    const timeout = async () => {
     await loadImg;
     await showBottomImg;
     await setTimeOut;
   }
   timeout().then(() =>{
    this.$emit('over');
    setTimeout(() => {
      this.$store.dispatch('closeAfter');
    }, 500);
  });
}
}
</script>

<style lang="less" scoped>
.cover{
	width: 100%;
  position: fixed;
  z-index: 7;

	.cover-img{
	  display: block;
    width: 6.4rem;
	}
  .cover-title{
    font-size: .25rem;
    color: #d8dcdf;
    position: absolute;
    bottom: 16.5%;
    left: 50%;
    transform: translateX(-50%);
  }
  .cover-bottom{
    width: 100%;
    height: 1.7rem;
    background: #17181a;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;

    .cover-font{
      width: 3rem;
      margin-left: 0.26rem;
      p:first-child{
        color: #d8dcdf;
        font-size:.37rem;
      }
      p:last-child{
        font-size:.27rem;
        color: #88898d;
      }
    }
  }
  .border-circle{
    width: 0.8rem;
    height: 0.8rem;
    border: 1px solid #bfc0c5;
    border-radius: 20%;
    margin-left: .3rem;
  }
	.circle-process{
		width: .56rem;
		height: .6rem;
		position: absolute;
		bottom: .51rem;
		left: .45rem;

		.wrapper{
			width: .28rem;
			height: .6rem;
			position: absolute;
      overflow: hidden;

			.circle{
        width: .38rem;
        height: .38rem;
				border: .1rem solid transparent;
				position: absolute;
				border-radius: 50%
			}
			.left-circle{
				border-left: .1rem solid #bfc0c5;
				border-top: .1rem solid #bfc0c5;
				transform: rotate(-220deg);
				left: 0;
				transition: all 1s linear
			}
			.right-circle{
				border-top: .1rem solid #bfc0c5;
				border-left: .1rem solid #bfc0c5;
				transform: rotate(-45deg);
				right: 0;
				transition: all 0.5s linear
			}
			.left-circle.transformLeft{
					transform: rotate(-45deg);
			}
			.right-circle.transformRight{
					transform: rotate(45deg);
			}
		}
		.left{
			left:0.01rem;

		}
		.right{
			right: 0;
		}
	}
}

</style>
