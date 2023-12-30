<script setup>
import {ref} from "vue";
import {resourceListApi} from "@/http/api.js";
import Resource from "@/components/Resource.vue";
import {useRouter} from "vue-router";

defineOptions({
  name: "ResourceList"
})

const router = useRouter()
const loading = ref(false)
const finished = ref(false)
// 上拉加载数据
const onLoad = () => {
  loading.value = true
  requestResource()
}

const toDetails = (resourceId)=>{
  router.push({
    path: "/resource/details",
    query: {
      resourceId: resourceId
    }
  })
}

const page = ref({
  pageIndex: 1,
  pageSize: 10
})

const resourceList = ref([])
const requestResource = async () => {
  const response = await resourceListApi(page.value)
  if (response.data.code === 200) {
    resourceList.value.push(...response.data.data)
    if (response.data.data.length < 10) {
      finished.value = true
    } else {
      page.value.pageIndex += 1
    }
  }
  loading.value = false
}
requestResource()
</script>

<template>
  <div class="resource-list-container">
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="gray">
        <van-swipe-item>
          <img src="https://img1.baidu.com/it/u=3712997108,442011921&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="https://img1.baidu.com/it/u=481689849,3217240113&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="resource-list">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false">

        <transition-group appear>
          <van-cell
              @click="toDetails(resource.id)"
              class="resource-item-container"
              v-for="resource in resourceList"
              :key="resource.id">
              <Resource :resource="resource" />
          </van-cell>
        </transition-group>
      </van-list>
    </div>
  </div>
</template>

<style scoped lang="less">

.v-enter-active {
  animation: resourceLoading 0.5s linear;
  animation-delay: 0.1s;
}


@keyframes resourceLoading {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.resource-list-container {
  width: 95%;
  margin: 0 auto;

  .my-swipe {
    height: 180px;
    width: 100%;
    border-radius: 10px;
  }

  .resource-list {
    margin-top: 10px;
    .resource-item-container {
      border-radius: 10px;
      margin: 8px 0;
    }

  }
}
</style>