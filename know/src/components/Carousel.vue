<template lang="html">
  <div class="box">
      <ul class="img"
        :style="{transform: `translateX(${offsetX}px)`}"
        :class="{active: isActive}"
      >
          <li v-for="swiper in swiperImg" @click="goToMessage(swiper)">
            <img class="touchImg" :src="swiper.img" v-touch:swipeleft="onSwiperLeft" v-touch:swiperight="onSwiperRight">
            <p v-text="swiper.title"></p>
          </li>
      </ul>
      <ul class="num">
        <li :class="{on:li.isLight}" v-for="li in liItems" v-text="li.text"></li>
      </ul>
  </div>
</template>

<script>
import  {distance} from '../../static/js/common.js'

export default {
  props:['loopNow'],
  data () {
    return {
      width: distance,
      offsetX: 0,
      loop: '',
      isActive: true,
      liItems:[
        { text: null, index: 0, isLight: true },
        { text: null, index: '', isLight: false },
        { text: null, index: '', isLight: false },
        { text: null, index: '', isLight: false },
        { text: null, index: '', isLight: false }
      ]
    }
  },
  watch:{
    loopNow (){
      this.autoplay()
    }
  },
  methods:{
    moveLeft:function(){
      this.offsetX = this.offsetX - this.width;
      if(this.offsetX === -(this.width) * 6 ){
        this.isActive = false;
        this.offsetX = 0;
        setTimeout(()=> {
          this.isActive = true;
          this.offsetX = -this.width;
          if(this.offsetX === -this.width){
            this.liItems[0].isLight = false
            this.liItems[1].isLight = true
          }
        }, 10);

      }

      if(this.offsetX > -(this.width)* 5){
        for (let li of this.liItems) {
          li.index === this.offsetX ? li.isLight = true : li.isLight = false
        }
      }else if(this.offsetX === -(this.width) * 5 ){
        this.liItems[4].isLight = false
        this.liItems[0].isLight = true
      }
    },
    moveRight() {
      this.offsetX = this.offsetX + this.width
      if(this.offsetX === this.width){
        this.isActive = false;
        this.offsetX = -(this.width)* 5;
        setTimeout(()=> {
          this.isActive = true;
          this.offsetX = -(this.width)* 4;
          this.liItems[4].isLight = true
        }, 2);
      }
      for (let li of this.liItems) {
        li.index === this.offsetX ? li.isLight = true : li.isLight = false
      }
    },
    autoplay:function(){
      this.loop = setInterval(this.moveLeft, 4000);
    },
    onSwiperLeft:function (){
      this.moveLeft()
    },
    onSwiperRight() {
      this.moveRight()
    },
    goToMessage(swiper) {
      this.$router.push(`/zhihu/${swiper.id}`)
      this.$store.dispatch('getBody', swiper.id);

      this.$store.dispatch('swiperChangeColor', swiper.title);
    }

  },
  computed:{
    swiperImg () {
      return this.$store.state.swiperImg
    }
  },
  created(){
    this.$store.dispatch('getData');
    this.liItems[1].index = -this.width;
    this.liItems[2].index = -(this.width)*2;
    this.liItems[3].index = -(this.width)*3;
    this.liItems[4].index = -(this.width)*4;
  }

}


</script>

<style lang="less" >

.box{
    width: 6.4rem;
    height: 3.7rem;
    position: relative;
    overflow: hidden;

    .img{
        width: 40rem;
        position: absolute;
        top: 0;
        left: 0;


        li{
          width: 6.4rem;
          float: left;

          img{
            width: 100%;
            height: 3.7rem;
          }
          p{
            width: 5.9rem;
            font-size: .35rem;
            color: #fdfcff;
            font-weight: 500;
            line-height: .4rem;
            padding-left: .3rem;
            position: absolute;
            bottom: .75rem;
          }
        }
    }
    .img.active{
      transition: all .3s ease;
    }
    .num{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 10px;
        font-size: 0;
        text-align: center;

        li{
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #d4caca;
            border-radius: 50%;
            margin: 0 3px;
        }
        li.on{
            background-color: #fff;
        }
    }
}


</style>
