<template>
<el-container>
  <div id="bg">
    <div class="row1">
      <div class="orb1"></div>
      <div class="orb2"></div>
      <div class="orb3"></div>
      <div class="orb4"></div>
      <div class="orb5"></div>
    </div>
    <div class="row2">
      <div class="orb1"></div>
      <div class="orb2"></div>
      <div class="orb3"></div>
      <div class="orb4"></div>
      <div class="orb5"></div>
    </div>
    <div class="row3">
      <div class="orb1"></div>
      <div class="orb2"></div>
      <div class="orb3"></div>
    </div>
  </div>
  <el-header>
    <pc-navmenu class="pcnavmenu"></pc-navmenu>
  </el-header>
  <el-main><router-view></router-view></el-main>
  <el-footer></el-footer>
</el-container>
</template>

<script>

import PcNavMenu from '../components/nav/PcNavMenu.vue'

export default {
  data () {
    return {}
  },
  mounted () {
    document.body.removeChild(document.getElementById('Loading'))
  },
  components: {

    'pc-navmenu': PcNavMenu

  }
}
</script>

<style lang="less" scoped>
.el-header{
  margin: 0;
  padding: 0;
margin-bottom: 45px;
}
.pcnavmenu{

     border-bottom: .5px solid #e3e3e3;
     padding-bottom: 5px;
}
.el-main{
  margin: 0;
  padding: 10px;
  overflow: hidden;
}
.el-footer{
  margin: 0;
  padding: 0;
}

 #bg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    // background-color: skyblue;
    transform: translate(-50%,-50%);
    z-index: -5;
    overflow: hidden;
    transform-style: preserve-3d;
  }
   .row1 div,
   .row2 div,
   .row3 div{
        border-radius: 50%;
        background: -webkit-linear-gradient(top,#fff,#dedede);
  }
  .row1 .orb1,.row1 .orb2,.row1 .orb3,.row1 .orb4,.row1 .orb5{
    position: absolute;
    width: 60px;
    height: 60px;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -270px;
  }
  .row1 .orb2{
    margin-left: -50px;
    margin-top: -200px;
  }
  .row1 .orb3{
    margin-left: 50px;
    margin-top: -120px;
  }
   .row1 .orb4{
    margin-left: 1000px;
    margin-top: -220px;
  }
   .row1 .orb5{
    margin-left: 150px;
    margin-top: -220px;
  }

.row2 .orb1,.row2 .orb2,.row2 .orb3,.row2 .orb4,.row2 .orb5{
    position: absolute;
    width: 200px;
    height: 200px;
    left: 50%;
    top: 50%;
    margin-left: -550px;
    margin-top: -200px;
  }
  .row2 .orb2{
    margin-left: 100px;
    margin-top: 0px;
  }
   .row2 .orb3{
    margin-left: 950px;
    margin-top: -60px;
  }
   .row2 .orb4{
    margin-left: 1550px;
    margin-top: -50px;
  }
   .row2 .orb5{
    margin-left: 2050px;
    margin-top: -20px;
  }

  .row3 .orb1,.row3 .orb2{
    position: absolute;
    width: 50px;
    height: 50px;
    left: 50%;
    top: 50%;
    margin-left: -550px;
    margin-top: 50px;
  }
  .row3 .orb2{
    margin-left: 150px;
    margin-top: 50px;
  }

  // 动画效果
   .row1 div{
     animation: orbmove 100s linear infinite;
   }
   .row2 div{
     animation: orbmove 40s linear infinite;
   }
   .row3 div{
     animation: orbmove 80s linear infinite;
   }
   @keyframes orbmove{
     form{
       transform: translateX(0px) rotate(0deg);
     }
     to{
       transform: translateX(-1000px) rotate(350deg) ;
     }
   }
</style>
