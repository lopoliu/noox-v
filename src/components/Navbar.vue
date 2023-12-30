<script setup>
import {useRoute, useRouter} from "vue-router";
import {useTokenStore} from "@/stores/index.js";

defineOptions({
  name: 'NavbarView'
})

const route = useRoute()
const router = useRouter()
const tokenStore = useTokenStore()

const toLogin = () => {
  router.push({
    path: "/user/login"
  })
}

const back = () =>{
  router.back()
}
</script>

<template>
  <div class="navbar">
    <van-nav-bar
        fixed
        placeholder
        left-text= '返回'
        @click-left="back"
        :left-arrow=route.meta.showLeft
        :title=route.meta.title>
      <template #right v-if="route.meta.showRight">
        <div>
          <!--未登录显示-->
          <span
              v-if="tokenStore.token === '' || tokenStore.token === undefined || tokenStore.token === null"
              @click="toLogin"
              class="unverified">前往登录</span>

          <!--已登录显示-->
          <span
              v-else
              class="verified">18732</span>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<style scoped>
.navbar {
  margin-bottom: 10px;
  .verified {

    &:after {
      font-family: iconfont, serif;
      content: '\e6e4';
      color: #fff
    }
  }

  .unverified {
    &:after {
      font-family: iconfont, serif;
      content: '\e63a';
      color: #fff;
    }
  }
}
</style>