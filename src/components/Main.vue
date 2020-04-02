<template>
<section class="home">
  <ul class="basecontent">

        <!-- <div class="userh">
          <router-link :to="'userpost/'+item.author._id"><img class="qq" v-lazy="item.author.avatars" alt=""></router-link>
          <div>
            <router-link class="router-link" :to="'userpost/'+item.author._id">{{item.author.username}}</router-link>
            <div class="left_width">{{item.date}}</div>
          </div>
        </div> -->
        <m-list v-if="post.length" path="post/" :post="post"></m-list>
        <!-- <router-link tag="li" :to="'post/'+item._id" class="title_box" v-for="item in post" :key="item.date">
          <section class="title">
            <p>{{item.title}}</p>
          </section>
          <section class="show_img">
            <img :src="item.imgUrl[0]" alt="">
          </section>
        </router-link> -->
  </ul>
  <section class="right_side">
    <!-- <img alt="" v-lazy="require('../assets/img/03.jpg')"> -->
    <div v-lazy:background-image="require('../assets/img/03.jpg')"></div>
  </section>

</section>
</template>

<script>
import mList from './blogs_list/List.vue'
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
export default {
  data () {
    return {
      post: []
    }
  },
  created () {
    this.getEssays()
  },
  mounted () {

  },
  components: {
    'm-list': mList
  },
  methods: {
    // 获取所有文章
    async getEssays () {
      const { data: res } = await this.$http.get('essay')
      res.essay.forEach(function (item) {
        item.date = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
      })

      this.post = res.essay
      // console.log(this.post)
    }
  },
  computed: {

  }
}
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
}
.basecontent{
  flex: 1;

//  >li{
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 25px;
//     // padding: 25px 20px 30px 25px;
//     height: 111px;
//     background-color: rgba(255, 255, 255, .6);
//     box-shadow: 5px 5px 20px #e4e3e3;
//     border-left: 12px solid #afccff;
//     padding: 0 20px;
//     cursor: pointer;
//     }
}
.qq{
  width: 50px;
  height: 50px;
  display: inline-block;
  border-radius: 50%;
}
.userh{
  display: flex;
  align-items: center;
  padding-left: 16px;
  > div{
    margin-left: 2%;
     >.router-link{
    font-weight: 600;
    color: #757575;
    text-decoration: none;
  }
   >div{
     color: #909090;
     letter-spacing: 1px;
     font-size: 12px;
     width: 92px;
   }
  }
}

//  .title {
//     color: #656565;
//     align-items: center;
//     >p{
//       font-size: 19px;
//       // font-weight: 600;
//       line-height: 19px;
//       width: 200px;
//     }
//   }
//   .show_img{
//     width: 85px;
//     height: 85px;
//     >img{
//       width: 85px;
//     height: 85px;
//     }
//   }
//  .overflow{
//    text-overflow: ellipsis;
//    white-space: pre-wrap;
//    letter-spacing: 1px;
//  }
  .right_side{
    margin: 6px 0 -2px 0;
    width: 240px;
    min-width: 240px;
    max-height: 600px;
    margin-left: 40px;
    box-shadow: 0 0 20px 3px #e4e3e3;
    overflow: hidden;
    >div{
    //   width: 240px;
    // min-width: 240px;
    // height: 100%;
    background-repeat: no-repeat;
    height: 100%;
    background-position: center;
    }
  }
  div[lazy="loaded"]{
    //    width: 20px;
    // max-width: 20px;
    // height: 100%;
    background-size: cover;
  }
  // img[v-lazy="loading"]{
  //      width: 240px;
  //   max-width: 240px;
  //   height: 100%;
  // }
  @media (max-width: 960px){
    .right_side{
      display: none;
    }
  //   .title_box{
  //     margin: 0 10px 0 15px;
  //   }
  //   .title{
  //   color: #656565;
  //   margin: 0;
  //   >p{
  //     font-size: 16px;
  //     // font-weight: 600;
  //     line-height: 16px;
  //     width: 200px;
  //   }
  // }
  }
</style>
