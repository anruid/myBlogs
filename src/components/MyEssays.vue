<template>
<article class="myEssays">
  <ul class="basecontent">
    <m-list v-if="isShow" path="../post/" :post="post" @updateList="getMyEssays" :isMyList='true'></m-list>
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
      const userId = window.sessionStorage.getItem('userId')
      const { data: res } = await this.$http.get('essay?author=' + userId)
      res.essay.forEach(function (item) {
        item.date = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
      })
      this.post = res.essay
      this.isShow = true
      // console.log(res)
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
    margin-bottom: 3%;
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
 .content{
    color: #2e3135;
    >h4{
      display: inline;
      font-weight: 600;
      line-height: 28px;
    }
    >pre{
      margin-left: 1%;
      width: 90%;
      height: 70px;
      background: #efefef;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      letter-spacing: 1px;
      word-wrap: break-word;
      overflow: hidden;
    }
  }

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
  .delete{
    display: flex;
    justify-content: flex-end;
  }
  .el-dropdown{
    margin-right: 5%;
  }
</style>
