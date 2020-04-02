<template>
<article class="myEssays">
  <ul class="basecontent">
    <!-- <li v-for="item in post" :key="item.date">
      <section >
        <div class="userh">
          <a href=""><div :style="{'background-image':'url('+item.author.avatars+')','background-repeat':'no-repeat','background-size': 'cover'}"  class="qq"></div></a>

          <div>
            <a href="">{{item.author.username}}</a>
            <div>{{item.date}}</div>
          </div>
        </div> -->
        <m-list v-if="isShow" path="../post/" :post="post" :usernamePath="true"></m-list>
        <!-- <router-link :to="'../post/'+item._id">
          <section class="content">
            <h4>{{item.title}}</h4>
            <pre>{{item.content}}</pre>
          </section>
        </router-link> -->
      <!-- </section> -->
    <!-- </li> -->
  </ul>
  <section class="right_side">
    <img v-lazy="require('../assets/img/03.jpg')" alt="">
  </section>

</article>
</template>

<script>
import mList from './blogs_list/List.vue'
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
export default {
  data () {
    return {
      post: [],
      isShow: false
    }
  },
  created () {
    this.getMyEssays()
  },
  components: {
    'm-list': mList
  },
  methods: {
    // 获取所有文章
    async getMyEssays () {
      const userId = this.$route.params.uid
      const { data: res } = await this.$http.get('essay?author=' + userId)
      res.essay.forEach(function (item) {
        item.date = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
      })
      // res.essay.forEach(function (item) {
      //   if (item.imgUrl === undefined) {
      //     item.imgUrl = ['https://homear.club/1585395097610_m_bg7.jpg']
      //   } else if (item.imgUrl.length === 0) {
      //     item.imgUrl = ['https://homear.club/1585395097610_m_bg7.jpg']
      //   }
      // })
      this.post = res.essay
      // console.log(res)
      this.isShow = true
    }
  }

}
</script>

<style lang="less" scoped>
.myEssays{
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
}
.basecontent{
  flex: 1;
  >li{
    padding: 2%;
    margin-bottom: 1%;
    background-color: #fff;
    }
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
  > div{
    margin-left: 2%;
     >a{
    font-weight: 700;
    color: #333;
    text-decoration: none;
  }
   >div{
     color: #909090;
     letter-spacing: 1px;
     font-size: 12px
   }
  }
}
//  .content{
//     color: #2e3135;
//     >h4{
//       display: inline;
//       font-weight: 600;
//       line-height: 28px;
//     }
//     >pre{
//       margin-left: 1%;
//       width: 90%;
//       height: 70px;
//       background: #efefef;
//       text-overflow: ellipsis;
//       white-space: pre-wrap;
//       letter-spacing: 1px;
//       word-wrap: break-word;
//       overflow: hidden;
//     }
//   }

  .right_side{
    width: 240px;
    min-width: 240px;
    max-height: 600px;
    margin-left: 20px;
    >img{
      width: 240px;
    min-width: 240px;
    height: 100%;
    }
  }
  @media (max-width: 960px){
    .right_side{
      display: none;
    }
  }
</style>
