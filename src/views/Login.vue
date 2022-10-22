<template>
  <div id="login" :class="bg">
    <Lottie id="login-icon" :src="icon" @control="ctlLot"></Lottie>

    <div id="login-flex" class="d-flex float-end justify-content-center align-items-center">
      <div id="login-window" class="shadow rounded p-4">
        <h1 class="no-select text-light" @click="this.$router.replace({name:'HomePage'})">XaZh<br>夏至</h1>
        <div>
          <div id="login-in" v-show="type=='signin'">
            <label for="email" class="form-label">邮箱：</label>
            <label v-show="!loginInfo.email[1]" class="text-danger">邮箱不合法</label>
            <input type="email" class="form-control" v-model="loginInfo.email[0]" placeholder="Enter email">
            <label for="password" class="form-label">密码：</label>
            <label v-show="!loginInfo.pswd[1]" class="text-danger">密码不合法</label>
            <a v-show="loginInfo.pswd[1]" href="/form/forgetpassword" class="text-primary text-decoration-none">忘记密码</a>
            <input type="password" class="form-control" v-model="loginInfo.pswd[0]" placeholder="Enter password">
          </div>
          <div id="login-up" v-show="type=='signup'">
            <label for="email" class="form-label">邮箱：</label>
            <label v-show="!loginInfo.email[1]" class="text-danger">邮箱不合法</label>
            <input type="email" class="form-control" v-model="loginInfo.email[0]" placeholder="Enter email">
            <label for="text" class="form-label">昵称：</label>
            <label v-show="!loginInfo.name[1]" class="text-danger">昵称不合法</label>
            <input type="text" class="form-control" v-model="loginInfo.name[0]" placeholder="Enter name">
            <label for="text" class="form-label">密码：</label>
            <label v-show="!loginInfo.pswd[1]" class="text-danger">密码不合法</label>
            <input type="text" class="form-control" v-model="loginInfo.pswd[0]" placeholder="Enter password">
          </div>
          <div id="login-btn" class="d-flex justify-content-around align-items-center">
            <button class="btn flex-grow-1 btn-primary rounded-start" @click="toOther">去{{
              type == 'signin' ? '注册' : '登录' }}
            </button>
            <button id="qwer" class="btn flex-grow-1 btn-success rounded-end" @click="submit">
              <span v-show="isSubmit" class="spinner-border spinner-border-sm"></span>
              {{ type == 'signin' ? '登录' : '注册' }}</button>
          </div>
        </div>
      </div>
    </div>

    <div id="login-result" class="modal fade" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4>{{ response.title }}</h4>
          </div>
          <div class="modal-body">
            <div v-html="response.content"></div>
          </div>
          <div class="modal-footer">
            <button id="login-result-btn" type="button" class="btn btn-primary rounded"
              data-bs-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>

    <div id="login-foot">
      <p class="text-center text-light">Copyright&copy; 夏至的个人网站</p>
    </div>
  </div>
</template>
<script>
  import Lottie from '@/components/Lottie.vue'

  export default {
    name: 'Login',
    components: {
      Lottie
    },
    props: {
      type: String,
    },
    data() {
      return {
        bg: '',
        icon: require('@/assets/jsonIcon/markus.json'),
        modalObj: null,
        submitBtn: {},
        isSubmit: false,
        response: {
          title: 'ok',
          content: '',
        },
        loginInfo: {
          email: ['', true],
          name: ['', true],
          pswd: ['', true],
        }
      }
    },
    methods: {
      ctlLot: function (lot) {
        lot.setSpeed(0.2)
      },
      toOther: function () {
        this.$router.replace({
          name: 'Login',
          query: {
            type: this.type == 'signin' ? 'signup' : 'signin'
          }
        })
      },
      submit: function () {
        let isVaild = true
        this.response.title = '错误'
        this.response.content = ''
        if (!this.loginInfo.email[1] || !this.loginInfo.email[0]) {
          this.response.content += '请输入合法有效的邮箱地址，方便以后登录和找回密码。<br><br>'
          isVaild = false
        }
        if (this.type == 'logup' && (!this.loginInfo.name[1] || !this.loginInfo.name[0])) {
          this.response.content += '请输入合法的昵称，昵称可以是数字、字母、中文、下划线。<br><br>'
          isVaild = false
        }
        if (!this.loginInfo.pswd[1] || !this.loginInfo.pswd[0]) {
          this.response.content += '请输入有效的密码，密码可以是6到16位数字、字母；为了方便记忆，不支持符号和中文。'
          isVaild = false
        }
        if (!isVaild) {
          this.modalObj.show()
          return false
        }

      }
    },
    mounted() {
      if (this.type != 'signin' && this.type != 'signup') {
        this.$router.replace({
          name: 'Login',
          query: {
            type: 'signin'
          }
        })
      }

      this.modalObj = new bootstrap.Modal(document.getElementById('login-result'))
      let loginBtn = document.querySelectorAll('#login-btn>button')
      this.submitBtn['to'] = loginBtn[0]
      this.submitBtn['submit'] = loginBtn[1]

      !(function (_this) {
        let bgColor = ['primary', 'success', 'info', 'warning', 'danger', 'secondary', 'dark']
        _this.bg = 'bg-' + bgColor[Math.round(Math.random() * 6)]
      })(this)
    },
    updated() {
      document.title = this.$store.state.title + (this.type == 'signin' ? '登录' : '注册')
    },
    watch: {
      isSubmit: function (v) {
        if (v) {
          this.submitBtn.to.setAttribute('disabled', null)
          this.submitBtn.submit.setAttribute('disabled', null)
        } else {
          this.submitBtn.to.removeAttribute('disabled')
          this.submitBtn.submit.removeAttribute('disabled')
        }
      },
      loginInfoEmail: function (v) {
        this.loginInfo.email[1] = v ? this.$store.state.tools.checkEmail(v) : true
      },
      loginInfoName: function (v) {
        this.loginInfo.name[1] = v ? this.$store.state.tools.checkName(v) : true
      },
      loginInfoPswd: function (v) {
        this.loginInfo.pswd[1] = v ? this.$store.state.tools.checkPswd(v) : true
      }
    },
    computed: {
      loginInfoEmail: function () {
        return this.loginInfo.email[0]
      },
      loginInfoName: function () {
        return this.loginInfo.name[0]
      },
      loginInfoPswd: function () {
        return this.loginInfo.pswd[0]
      }
    }
  }
</script>
<style scoped>
  #login {
    width: 100vw;
    height: 100vh;
    transition: all 1 ease-in-out;
  }

  #login-foot {
    opacity: .5;
    width: 100vw;
    position: absolute;
    bottom: 2rem;
  }

  #login-icon {
    position: fixed;
    height: 100%;
    width: 100%;
  }

  #login-flex {
    max-width: 900px;
    width: 100%;
    height: 100%;
  }

  #login-window {
    width: 440px;
    height: 500px;
    min-width: 300px;
    margin: auto 44px;
    background-color: rgba(255, 255, 255, .2);
    backdrop-filter: blur(21px);
    z-index: 99;
    position: relative;
  }

  #login-window>h1 {
    font-family: 'xazh';
    font-size: 44px;
    line-height: 40px;
    position: absolute;
    top: -100px;
  }

  .form-label {
    font-size: 30px;
    font-weight: 900;
    color: rgba(255, 255, 255, .5);
    margin-top: 40px;
  }

  #login-up>.form-label {
    font-size: 20px;
    margin-top: 12px;
  }

  .form-control {
    outline: none;
    background-color: rgba(255, 255, 255, .5);
    color: rgba(0, 0, 0, .5);
    border: none;
    height: 50px;
  }

  #login-btn {
    height: calc(160px - 1.5rem);
  }

  .btn {
    opacity: .7;
    width: 50%;
    height: 55px;
    transition: width .4s ease-in-out;
    white-space: nowrap;
    border-radius: 0;
    font-size: 20px;
  }

  .btn:hover {
    width: 1000%;
  }

  #login-in,
  #login-up {
    height: calc(340px - 1.5rem);
  }

  #login-result-btn:hover {
    width: 50%;
  }

  .modal {
    background-color: rgba(255, 255, 255, .5);
    backdrop-filter: blur(20px);
  }

  .modal-content {
    background-color: rgba(255, 255, 255, .7);
  }

  .modal-header {
    border-bottom: none;
  }

  .modal-footer {
    border-top: none;
  }
</style>