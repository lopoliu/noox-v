<script setup>
import {useRoute, useRouter} from "vue-router";
import ResourceDetails from "@/views/resource/ResourceDetails.vue";
import {resourceDetailApi} from "@/http/api.js";
import {ref} from "vue";
import {useTokenStore} from "@/stores/index.js";

defineOptions({
  name: "ResourceDetails"
})
const router = useRouter()

const tokenStore = useTokenStore()

const route = useRoute()

const currentResourceId = route.query.resourceId

const resourceDetails = ref({})

const showDialog = ref(false)

const loginStatus = tokenStore.isLogin()

const dialogContext = ref({
  title: '资源兑换',
  confirmButtonText: '确认兑换'
})
const fullImages = (imgName) => {
  return "http://192.168.0.111/images/" + imgName
}

const requestResourceDetails = async () => {
  const response = await resourceDetailApi(currentResourceId)
  if (response.data.code === 200) {
    resourceDetails.value = response.data.data
  }
}
requestResourceDetails()


const acquireResource = () => {
  if (!loginStatus) {
    dialogContext.value.confirmButtonText = "前往登录"
    showDialog.value = true
  }
}
const confirmAcquireResource = () => {
  if (!loginStatus) {
    router.push({
      path: "/user/login",
      query: {
        backUrl: route.path,
        backParams: route.query.resourceId
      }
    })
  }
}

</script>

<template>
  <van-dialog
      v-model:show="showDialog"
      title='资源兑换'
      :confirmButtonText=dialogContext.confirmButtonText
      show-cancel-button
      @confirm="confirmAcquireResource">
    <div v-if="loginStatus" class="dialog-context">
      <div class="dialog-resource-title">资源标题：{{ resourceDetails.title }}</div>
      <div class="dialog-resource-price">资源价格：{{ resourceDetails.price }}积分</div>
      <div class="dialog-resource-validity">有效时间：30天后不保证资源有效</div>
      <div class="dialog-resource-mode">下载方式：讯雷</div>
    </div>
    <div v-else class="dialog-context">
      <h4>你还没有登录</h4>
    </div>
  </van-dialog>
  <div class="resource-details-container">
    <div class="resource-details-title">
      <h2>{{ resourceDetails.title }}</h2>
    </div>
    <div class="img-list">
      <van-image
          v-for="(img, index) in resourceDetails.images" :key="index"
          width="100%"
          lazy-load
          :src="fullImages(img)">
      </van-image>
    </div>

  </div>
  <div class="resource-details-submit-bar">
    <div class="acquire-help">
      <span>《使用教程》</span>
    </div>
    <div @click="acquireResource" class="acquire-resource">
      <span>获取下载链接</span>
    </div>
  </div>
</template>

<style scoped>
.dialog-context {
  padding: 15px 30px;

  > div {
    margin-bottom: 10px;
  }

  .dialog-resource-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

.resource-details-container {
  width: 92%;
  margin: 0 auto;

  .img-list {
    margin-bottom: 50px;
  }
}

.resource-details-submit-bar {
  position: fixed;
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #343434;

  .acquire-help {
    flex: 1;
    text-align: center;
    line-height: 50px;
    background-color: #000000;
  }

  .acquire-resource {
    text-align: center;
    line-height: 50px;
    width: 35%;
    color: #000000;
    background-color: deepskyblue;
  }
}
</style>