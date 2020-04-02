<template>
<article class="myEssays">
  <section v-for="item in post" :key="item._id">
    <section v-lazy:background-image="require('../assets/img/03.jpg')" class="right_side">
   <div class="userh">
        <router-link :to="'../userpost/'+item.author._id"><div :style="{'background-image':'url('+item.avatars+')','background-repeat':'no-repeat','background-size': 'cover'}"  class="qq"></div></router-link>

        <div>
          <router-link :to="'../userpost/'+item.author._id">{{item.author.username}}</router-link>
          <div>{{item.date}}</div>
        </div>
      </div>
  </section>

    <section class="basecontent">
        <section class="content">
          <div class="title">{{item.title}}</div>
          <div v-html="content" class="markdown-body"></div>
        </section>

      </section>

  </section>
</article>
</template>

<script>
import Simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'github-markdown-css'
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
export default {
  data () {
    return {
      post: '',
      content: ''
    }
  },
  created () {
    this.getMyEssays()
  },
  methods: {
    // 获取文章内容
    async getMyEssays () {
      const essayid = this.$route.params.essayid
      // console.log(essayid)
      // console.log(require('./Main'))
      const { data: res } = await this.$http.get('essay?essayid=' + essayid + '&show=content')
      res.essay.forEach(function (item) {
        item.date = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
      })
      this.post = res.essay
      this.content = Simplemde.prototype.markdown(res.essay[0].content)
      // console.log(res)
      // console.log(essayid)
    }
  }

}
// module.exports = exports = essayContent
</script>

<style scoped lang="less">
.content{
   font-size: 14px;
    margin: 22px 40px 35px;
    padding-top: 30px;
    color: #2e3135;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 5px 5px 20px #e3e3e3;
  }
.markdown-body {
box-sizing: border-box;
min-width: 200px;
max-width: 720px;
// margin: 0 auto;
padding: 45px;
font-size: 14px;
}
.myEssays{
  margin: 0;
}
.myEssays >section{
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  }
.basecontent{
  flex: 1;
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

}
.userh div{
    margin-left: 2%;
  }
  .userh div>a{
    font-weight: 700;
    color: #333;
    text-decoration: none;
  }
  .userh div>div{
     color: #909090;
     letter-spacing: 1px;
     font-size: 12px
   }

.title{
      text-align: center;
      font-size: 2em;
      font-weight: 600;
      line-height: 28px;
      margin-left: 3%
    }
    //  .content pre{
    //   // background: #fefefe;
    //   margin-left: 5%;
    //   width: 90%;
    //   // height: 960px;
    //   // background: skyblue;
    //   font-size: 16px;
    //   // text-overflow: clip;
    //   white-space: pre-wrap;
    //   letter-spacing: 1px;
    //   word-wrap: break-word;

    // }
// 左侧信息栏
  .right_side{
    width: 240px;
    min-width: 240px;
    max-height: 600px;
    margin-left: 20px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  @media (max-width: 920px){
    .right_side{
      display: none;
    }
    .content{
      padding: 10px 20px 25px;
      font-size: 12px;
      line-height: 1.6;
      margin: 0;
    }
    .basecontent{
      margin: 7px 15px 0;
    }
    .markdown-body{
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-size: 12px;
      max-width: 250px;
    }
  }
</style>
