<template>
<div ref="list">
  <li v-for="item in post" :key="item.date" class="show_box bottom_top1">
     <router-link :to="path+item._id" class="title_box" >
          <section class="title">
            <div class="user_box">
               <router-link :to="'userpost/'+item.author._id" v-if="!usernamePath"><span>用户: </span>{{item.author.username}}</router-link>
               <router-link :to="'../home'" v-if="usernamePath"><span>用户: </span>{{item.author.username}}</router-link>
               <div>{{item.date}}</div>
            </div>
            <p>{{item.title}}</p>
          </section>
          <!-- 右侧用户图片区 -->
          <section class="show_img" v-if="item.imgUrl!==undefined&&item.imgUrl.length">
            <div class="before_gif" v-lazy:background-image="item.imgUrl[0]"></div>
          </section>
        </router-link>
          <!-- 编辑删除区 -->
            <section class="delete" v-if="isMyList">
          <el-dropdown @command="removeConfirm" trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>修改文章</el-dropdown-item>
            <el-dropdown-item divided :command="item">删除文章</el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
          </section>
  </li>
</div>
</template>

<script>
export default {
  props: {
    path: String,
    post: Array,
    isMyList: {
      type: Boolean,
      default: false
    },
    usernamePath: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    document.body.addEventListener('touchstart', function () { })
    // console.log(document.body)

    // console.log(this.$refs.list.children.length)
    const myList = this.$refs.list.children
    // console.log(this.$refs.list.clientHeight)
    // for (let i = 0; i < myList.length; i++) {
    //   console.log()
    // }
    // const delaySecond = [0, 1, 2, 3]
    myList.forEach((item, index) => {
      // console.log(item)
      item.style.animation = `translatey 1s linear ${index - 0.5}s`
      item.addEventListener('animationstart', () => {
        item.className = 'show_box'
      })
      // console.log('index=' + index)
    })

    // console.log(myList.length)
  },
  methods: {
    async removeConfirm (command) {
      if (command !== '') {
        const confirmResult = await this.$confirm('此操作将永久删除该文章, 是否继续?', '删除文章', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // console.log(confirmResult)
        if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
        const { data: res } = await this.$http.delete('essay/delete/' + command._id)
        if (res.status !== 200) return this.$message.error('删除失败')
        // 传给父组件更新列表
        this.$emit('updateList', 'update')
        this.$message.success(res.msg)
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import '~assets/css/transform.css';

div[lazy='loaded']{
  // zoom: 20%;
  //  background-position: center;
  //  background-origin: content-box;
  // background-image: null important;
  // zoom: 10%
   background-size: cover;
}
.user_box{
  display: flex;
  padding: 5px 0;
  >a{
    color: #666666;
    font-size: 17px;
    padding-right: 15px;
    >span{
      font-size: 12px;
      color: #aaaaaa;
    }
  }
  >div{
    font-size: 15px;
  }
}
.show_box{
     margin: 10px 10px 15px 15px;
    // padding: 25px 20px 30px 25px;
    height: 111px;
    background-color: rgba(255, 255, 255, .6);
    box-shadow: 0 0 2px 2px #e9e3e3;
    border-left: 12px solid #afccff;
    padding: 0 20px;
    cursor: pointer;
    border-top-left-radius: 2% 10%;
    border-top-right-radius: 2% 10%;
    border-bottom-left-radius: 2% 10%;
    border-bottom-right-radius: 2% 10%;
    transition: all .25s linear;
    >.title_box{
       display: flex;
    justify-content: space-between;
    align-items: center;
    }
    }
    .title {
    color: #656565;
    align-items: center;
    >p{
      font-weight: 600;
      font-size: 19px;
      // font-weight: 600;
      line-height: 19px;
      max-width: 195px;
      // height: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .show_img{
    width: 85px;
    height: 85px;
    position: relative;
    >div{
      width: 75px;
    height: 75px;
    margin: 10px 0 0 5px;
    background-repeat: no-repeat;
    // background-size: cover;
    // background-origin: content-box;
    background-position: center;
    }
  }
   .delete{
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 9999;
  }
  .el-dropdown{
    margin-right: 5%;
    position: absolute;
    z-index: 9999;
  }

    .title{
    color: #656565;
    margin: 0;
    >p{
      font-size: 16px;
      // font-weight: 600;
      line-height: 16px;
      width: 193px;
    }
  }

   @media (min-width: 960px){
    // 去除元素出现滚动条问题 子级设置padding-right: 20px; 父元素设置overflow: hidden;
// 已移除，需在最外层父元素去除，否则有横向滚动条
// .hidden_scrollbar{
//   overflow: hidden;
//   padding: 10px;
// }
// .bottom_top1{
//   opacity: 0;
//   animation: translatey 2s linear;
// }
// @keyframes translatey {
//   0% {
//     opacity: 1;
//     transform: translateY(20px);
//   }
//   100%{
//     opacity: 1;
//     transform: translateY(0px);
//   }
// }
// .before_gif::before{
//   content: url('~assets/img/loading.gif');
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%,-50%);
//   // width: 75px;
//   // height: 75px;
//   // background-color: #99ccff;
// }

.user_box{
  display: flex;
  padding: 5px 0;
  >a{
    color: #666666;
    font-size: 17px;
    padding-right: 15px;
    >span{
      font-size: 12px;
      color: #aaaaaa;
    }
  }
  a:hover{
    color: #66ccff;
  }
  >div{
    font-size: 15px;
  }
}
.show_box{
    margin-bottom: 25px;
    margin-right: 15px;
    // padding: 25px 20px 30px 25px;
    height: 111px;
    background-color: rgba(255, 255, 255, .6);
    box-shadow: 0 0 2px 2px #e9e3e3;
    border-left: 12px solid #afccff;
    padding: 0 20px;
    cursor: pointer;
    border-top-left-radius: 2% 10%;
    border-top-right-radius: 2% 10%;
    border-bottom-left-radius: 2% 10%;
    border-bottom-right-radius: 2% 10%;
    transition: all .25s linear;
    >.title_box{
       display: flex;
    justify-content: space-between;
    align-items: center;
    }
    }
    .show_box:hover{
      transform: translateY(-7px);
      // background-color: #66ccff;
      box-shadow: 0 0 10px 5px #e4e3e3;
      border-left: 12px solid #99ccff;
    }
    .title {
    color: #656565;
    align-items: center;
    >p{
      font-weight: 600;
      font-size: 19px;
      // font-weight: 600;
      line-height: 19px;
      max-width: 590px;
      // height: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  }

</style>
