<template>
<div>

  <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#efefef" router width="90%">
  <el-menu-item index="home">首页</el-menu-item>
  <el-menu-item index="/hhh" v-if="isUser">我的文章</el-menu-item>
  <el-menu-item index="3" v-if="isUser">写文章</el-menu-item>

  <el-submenu index="7">
    <template slot="title">关于</template>
    <el-menu-item index="2-1">随笔</el-menu-item>
    <el-menu-item index="2-2">我的工作</el-menu-item>
    <el-menu-item index="2-3">我的简历</el-menu-item>
  </el-submenu>
  <el-menu-item index="6" v-if="isUser">头像昵称</el-menu-item>
  </el-menu> -->
  <nav class="nav_margin_bottom">
     <section class="xx">
     <div class="xz"></div>
  </section>
    <ul class="navList">
      <li><router-link to="/home">首页</router-link></li>
      <li  v-if="isUser"><router-link to="/myessays">我的文章</router-link></li>
      <li  v-if="isUser"><router-link to="/add">写文章</router-link></li>
       <li  v-if="isUser"><span @click="exit()">登出</span></li>
      <li v-else>
        <span class="login" @click="loginDialog=true">登录</span>
        <span @click="registerDialog=true">注册</span>
      </li>
    </ul>
 <p class="test">已添加测试账号，点击登录，登录后开放个人文章页，创建博客文章页，实现markdown编辑编写博客</p>
  </nav>
  <!-- 注册Dialog -->
  <el-dialog
  title="注册账号"
  :visible.sync="registerDialog"
  width="300px" @close="registerDialogClose">
  <!-- 表单验证注册 -->
      <el-form :model="registerRuleForm" :rules="registerRules" ref="registerRuleFormRef"  status-icon >
        <el-form-item prop="username">
          <el-input v-model="registerRuleForm.username" style="min-width:250px" placeholder="昵称"></el-input>
        </el-form-item>
         <el-form-item prop="email">
          <el-input v-model="registerRuleForm.email" style="min-width:250px" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerRuleForm.password" show-password style="min-width:250px" placeholder="密码"></el-input>
        </el-form-item>

      </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitRegisterForm('registerRuleFormRef')" size="small">立即注册</el-button>
    <el-button @click="resetRegisterForm('registerRuleFormRef')" size="small">重置</el-button>
  </span>
</el-dialog>
<!-- 登录Dialog -->
<!-- 登录对话框 -->
  <el-dialog
  title="Welcome，功能测试完善中，点击登录"
  :visible.sync="loginDialog" width="300px" @close="loginDialogClose">
  <el-form :model="loginRuleForm" :rules="loginRules" ref="loginRuleFormRef"  status-icon>
         <el-form-item prop="email">
          <el-input v-model="loginRuleForm.email" style="min-width:250px" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginRuleForm.password" show-password style="min-width:250px" placeholder="密码"></el-input>
          <span>没有账号？<span class="loginTag" @click="registerDialog=true,loginDialog=false">点击注册</span></span>
        </el-form-item>
      </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitLoginForm('loginRuleFormRef')" size="small">登录</el-button>
          <el-button @click="resetLoginForm('loginRuleFormRef')" size="small">重置</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
  data () {
    // 验证邮箱规则
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证邮箱是否被使用
    const validateEmail = async (rule, value, cb) => {
      const { data: res } = await this.$http.post('user/register/email', { email: this.registerRuleForm.email })
      // console.log(res)
      if (res.status === 200) return cb()
      // console.log(res)
      cb(new Error(res.msg))
    }
    // 验证用户名是否被使用
    const validateUsername = async (rule, value, cb) => {
      const { data: res } = await this.$http.post('user/register/username', { username: this.registerRuleForm.username })
      // console.log(res)
      if (res.status === 200) return cb()
      // console.log(res)
      cb(new Error(res.msg))
    }
    return {
      isUser: '',
      loginDialog: false,
      registerDialog: false,
      // 登录
      loginRuleForm: {
        password: '123456',
        email: '123@c.c'
      },
      loginRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      // 注册
      registerRuleForm: {
        username: '',
        password: '',
        email: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.isLogin()
  },
  methods: {
    // 登录
    submitLoginForm (ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('user/login', this.loginRuleForm)
        // console.log(this.loginRuleForm)
        // if (res.status !== 200) return this.$message.error(res.msg)
        // this.$message.success(res.msg)
        this.isUser = res.user_id
        // console.log(res)

        this.loginDialog = false
        sessionStorage.setItem('userId', res.user_id)
        sessionStorage.setItem('token', res.token)
      })
    },
    resetLoginForm (resetref) {
      this.$refs[resetref].resetFields()
    },
    loginDialogClose () {
      this.$refs.loginRuleFormRef.resetFields()
    },
    // 从sessionStorage中拿到userId赋值给动态显示登录后菜单
    isLogin () {
      this.isUser = window.sessionStorage.getItem('userId')
    },
    // 注册
    submitRegisterForm (ref) {
      this.$refs[ref].validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('user/register', this.registerRuleForm)
        // console.log(res)
        if (res.status !== 200) return this.$message.error(res.msg)
        this.$refs[ref].resetFields()
        this.registerDialog = false
        this.$message.success(res.msg)
        this.loginDialog = true
      })
    },
    resetRegisterForm (resetref) {
      this.$refs[resetref].resetFields()
    },
    registerDialogClose () {
      this.$refs.registerRuleFormRef.resetFields()
    },
    async exit () {
      const confirmResult = await this.$confirm('', '是否登出', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('已取消')
      this.$message.success('已登出')
      window.sessionStorage.removeItem('userId')
      window.sessionStorage.removeItem('token')
      this.isUser = ''
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.test{
  position: absolute;
}
.xx{
  position: absolute;
  z-index: -5;
  >.xz{
    width: 90vw;
    height: 400px;
    background-image: url(../../assets/img/header.png);
    background-repeat: no-repeat;
  }
}

  .navList{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 60px;
    padding-right: 10%;
    text-align: center;
    align-items: center;
    >li{
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 15px;
      line-height: 34px;
      font-weight: 500;
      >a:link,a:visited{
        color: #757575;
        font-weight: 500;
        padding-bottom: 6px;
        border-bottom: 3px solid rgb(246, 246, 246);
      }
      >span{
        color: #007fff
      }
      >.login::after{
        content: '·';
        margin: 0 7px;
      }
    }
  }
  .router-link-exact-active{
    color: #123 !important;
    // font-weight: 600 !important;
    border-bottom: 3px solid #66ccff!important;
  }
 .loginTag{
   cursor: pointer;
   color: #007fff
 }
</style>
