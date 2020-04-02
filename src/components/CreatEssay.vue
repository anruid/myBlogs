<template>
<section class="addEssay">
  <!-- 隐藏的上传文件按钮 -->
  <input style="display:none" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" id="upimginput" ref="upimginput">
<form method="post">
  <section class="title_box">
    <textarea placeholder="输入标题..." v-model="addEssayData.title" maxlength="80" rows="1" class="title">
    </textarea>
  </section>
  <section class="content_box">
    <textarea name="content" id="simplemde" placeholder="输入正文..."></textarea>
  </section>
  <el-button class="bt_right" @click="addEssay()">发布</el-button>
</form>
</section>
</template>

<script>
// import qs from 'qs'
import Simplemde from 'simplemde'
import 'github-markdown-css'
import 'simplemde/dist/simplemde.min.css'
import 'font-awesome/less/font-awesome.less'
export default {
  data () {
    return {
      addEssayData: {
        title: '',
        content: '',
        user_id: '',
        imgArr: []
      }
    }
  },
  mounted () {
    const simplemde = new Simplemde({
      element: document.getElementById('simplemde'),
      autoDownloadFontAwesome: false
    })
    simplemde.codemirror.on('change', () => {
      this.addEssayData.content = simplemde.value()
    })
    // console.log(this.$refs.upimginput)

    const input = this.$refs.upimginput
    const formData = new FormData()
    // const params = new URLSearchParams()
    input.addEventListener('change', async () => {
      formData.append('p', input.files[0])
      // const config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
      // console.log(typeof input.files[0])
      // const aa = JSON.stringify(input.files[0])
      // for (let i of formData) {
      //   console.log(i)
      // }
      // params.append('p', input.files[0])
      // const ccc = qs.stringify({ 'p': input.files[0] })
      // console.log(typeof params)

      const { data: res } = await this.$http.post('essay/imgupload', formData)
      // console.log(res)
      const url = `![](/${res})`
      formData.delete('p')
      simplemde.value(`${this.addEssayData.content}\n${url}\n`)
      this.addEssayData.imgArr.push('https://homear.club/' + res)
      // console.log(this.addEssayData.imgArr)
    })
  },
  methods: {
    async addEssay () {
      this.addEssayData.user_id = window.sessionStorage.getItem('userId')
      const { data: res } = await this.$http.post('essay/add', this.addEssayData)
      if (res.status !== 200) return this.$message.error('发表失败')
      // 编程式导航到我的文章页
      this.$router.push('/myessays')
      this.$message.success(res.msg)
      // console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
article{
  margin-top: 10vh
}
.title_box{
  max-width: 95%;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 12px;
}
.content_box{
  padding-top: 20px;
}
.title{
  font-size: 27px;
  font-weight: 700;
  border: none;
  // opacity: .5;
  // color: #000;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  background-color: rgba(0,0,0,0);
}
@media(max-width: 920px){
  .content_box{
  padding-top: 5px;
}
// .bt_right{
//   // margin-right: 50px;
//   transform: translate(360%,25%);
// }
}
.bt_right{
  // margin-right: 50px;
  transform: translate(75vw,10px);
}
</style>
