<template>
  <div id="homepage" class="container-fulid">
    <img id="bg" v-show="showBGStamp" src="@/assets/bg.png">
    <div id="homepage-head" v-show="showHeadImg">
      <div id="homepage-head-img" class="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
        <div class="carousel-indicators">
          <button data-bs-target="#homepage-head-img" data-bs-slide-to="0" class="active"></button>
          <button data-bs-target="#homepage-head-img" data-bs-slide-to="1"></button>
          <button data-bs-target="#homepage-head-img" data-bs-slide-to="2"></button>
          <button data-bs-target="#homepage-head-img" data-bs-slide-to="3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="@/assets/HeadImg/1.jpg" class="d-block w-100">
          </div>
          <div class="carousel-item ">
            <img src="@/assets/HeadImg/2.jpg" class="d-block w-100">
          </div>
          <div class="carousel-item ">
            <img src="@/assets/HeadImg/3.jpg" class="d-block w-100">
          </div>
          <div class="carousel-item ">
            <img src="@/assets/HeadImg/4.jpg" class="d-block w-100">
          </div>
        </div>
      </div>
    </div>

    <div id="homepage-bar" class="sticky-top text-nowrap" :class="[isDark ? 'bg-light' : 'bg-white']">
      <nav class="navbar navbar-expand-sm navbar-light shadow">
        <span class="navbar-text text-primary mx-3 h4">
          <img src="@/assets/icon.png" style="width: 33px;" class="align-bottom">
          夏至的主页
        </span>
        <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse"
          data-bs-target="#homepage-bar-items">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="homepage-bar-items" class="collapse navbar-collapse">
          <ul id="homepage-bar-items" class="nav nav-pills container justify-content-start ps-3">
            <li class="nav-item">
              <router-link to="/blog">
                <a class="nav-link text-dark" :class="[barSelected == 0 ? 'active text-white' : '']"
                  @click="barClick(0)">博客</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/project">
                <a class="nav-link text-dark" :class="[barSelected == 1 ? 'active text-white' : '']"
                  @click="barClick(1)">项目</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/tools">
                <a class="nav-link text-dark" :class="[barSelected == 2 ? 'active text-white' : '']"
                  @click="barClick(2)">工具</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/favours">
                <a class="nav-link text-dark" :class="[barSelected == 3 ? 'active text-white' : '']"
                  @click="barClick(3)">推荐</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/xazh">
                <a class="nav-link text-dark" :class="[barSelected == 4 ? 'active text-white' : '']"
                  @click="barClick(4)">夏至</a>
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link text-dark dropdown-toggle" data-bs-toggle="dropdown" href="#">设置</a>
              <ul class="dropdown-menu pe-3">
                <li>
                  <a class="dropdown-item float-start no-select">深色模式</a>
                  <div class="form-check form-switch py-1">
                    <input class="form-check-input float-end" type="checkbox" @click="switchDark" id="switchDark">
                  </div>
                </li>
                <li>
                  <a class="dropdown-item float-start no-select">顶部画幅</a>
                  <div class="form-check form-switch py-1">
                    <input class="form-check-input float-end" type="checkbox" @click="switchHeadImg" id="switchHeadImg">
                  </div>
                </li>
                <li>
                  <a class="dropdown-item float-start no-select">背景图章</a>
                  <div class="form-check form-switch py-1">
                    <input class="form-check-input float-end" type="checkbox" @click="switchBGStamp" id="switchBGStamp">
                  </div>
                </li>
              </ul>
            </li>
          </ul>

          <ul class="nav nav-pills container-fulid justify-content-end ps-3 me-5">
            <router-link to="/login?type=signin">
              <li v-show="!isLogin">
                <button class="btn btn-primary">
                  登录
                </button>
              </li>
            </router-link>
            <router-link to="/login?type=signup">
              <li v-show="!isLogin">
                <button class="btn">
                  注册
                </button>
              </li>
            </router-link>
            <li v-show="isLogin" id="homepage-self-icon">
              <div id="homepage-self-icon-img" ref="selfIconImg" class="rounded-circle">
                <img src="@/assets/icon.png" style="width: calc(100% - 2px);">
              </div>
              <transition name="showSelfIcon" tag="show-self">
                <div v-show="showSelfCard" id="homepage-self-icon-card" ref="selfIconInfo" class="card"
                  style="width: 150px">
                  <div class="card-body">
                    <h4 class="card-title">
                      夏至
                    </h4>
                    <p class="card-text text-wrap">
                      说点什么吧说点什么吧说点什么吧
                    </p>
                    <button class="btn btn-sm btn-primary float-start">
                      个人
                    </button>
                    <button class="btn btn-sm btn-danger float-end">
                      退出
                    </button>
                  </div>
                </div>
              </transition>
            </li>
            <li v-show="isAdmin & isLogin" class="nav-item ms-3">
              <router-link to="/setting">
                <a class="nav-link text-dark" :class="[barSelected == 6 ? 'active text-white' : '']"
                  @click="barClick(6)">设置</a>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div id="homepage-content" class="container d-flex flex-wrap justify-content-around">
      <router-view></router-view>
      <div v-for="i in amount" :key="i" class="card m-5" style="width:200px">
        <img class="card-img-top" src="@/assets/icon.png">
        <div class="card-body">
          <h4 class="card-title">
            夏至
          </h4>
          <p class="card-text">
            夏至的个人网站夏至的个人网站夏至的个人网站
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'HomePage',
    components: {
    },
    data() {
      return {
        barSelected: 0,
        isLogin: false,
        isAdmin: false,
        showSelfCard: false,
        isDark: false,
        showHeadImg: true,
        showBGStamp: true,
        amount: 10,
      }
    },
    methods: {
      barClick: function (m) {
        this.barSelected = m
      },
      switchDark: function () {
        if (this.isDark)
          document.body.classList = 'bg-light'
        else
          document.body.classList = 'bg-secondary'

        this.isDark = !this.isDark
        this.updateSettingCookie('home.drak', this.isDark)
      },
      switchHeadImg: function () {
        this.showHeadImg = !this.showHeadImg
        this.updateSettingCookie('home.headImg', this.showHeadImg)
      },
      switchBGStamp: function () {
        this.showBGStamp = !this.showBGStamp
        this.updateSettingCookie('home.bgStamp', this.showBGStamp)
      },
      updateSettingCookie: function (key, value) {
        this.$cookies.set(key, value, '1y')
      }
    },
    mounted() {
      document.title = '夏至的主页 - xazh'

      // Characteristic of Move in or out for 'self-icon'
      !(function (_this) {
        _this.$refs.selfIconImg.onmouseenter =
          _this.$refs.selfIconInfo.onmouseenter =
          () => {
            _this.$refs.selfIconImg.style.width = '200%'
            _this.$refs.selfIconImg.style.height = '200%'
            _this.$refs.selfIconImg.style.boxShadow = '.5rem -.5rem 1rem rgba(0, 0, 0, .15)'
            _this.showSelfCard = true
          }
        _this.$refs.selfIconImg.onmouseleave =
          _this.$refs.selfIconInfo.onmouseleave =
          () => {
            _this.$refs.selfIconImg.style.width = '100%'
            _this.$refs.selfIconImg.style.height = '100%'
            _this.$refs.selfIconImg.style.boxShadow = 'none'
            _this.showSelfCard = false
          }
      })(this)

      // Initializa 'setting' for Home
      !(function (_this) {
        _this.isDark = _this.$cookies.get('home.drak') === 'true' ? true : false
        _this.showHeadImg = _this.$cookies.get('home.headImg') === 'false' ? false : true
        _this.showBGStamp = _this.$cookies.get('home.bgStamp') === 'false' ? false : true

        if (_this.isDark) {
          document.getElementById('switchDark').setAttribute('checked', null)
          document.body.classList = 'bg-secondary'
        } else {
          document.body.classList = 'bg-light'
        }
        if (_this.showHeadImg)
          document.getElementById('switchHeadImg').setAttribute('checked', null)
        if (_this.showBGStamp)
          document.getElementById('switchBGStamp').setAttribute('checked', null)
      })(this)
    },
    watch: {
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  #bg {
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 400px;
    height: 400px;
    z-index: -9999;
  }

  #homepage-head {
    transition: height 1s ease-in-out;
  }

  #homepage-self-icon {
    position: relative;
    height: 44px;
    width: 44px;
  }

  #homepage-self-icon-img {
    padding: 2px;
    border: 1px solid #dee2e6;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    background-color: white;
    transition: all .2s ease-in-out;
  }

  #homepage-self-icon-card {
    overflow: hidden;
    position: absolute;
    top: 44px;
    right: 44px;
    z-index: 99;
  }
</style>