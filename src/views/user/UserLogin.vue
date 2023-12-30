<script setup>
import {ref} from "vue";
import {userSmsLoginApi} from "@/http/api.js";
import {useTokenStore} from "@/stores/index.js";
import {useRoute, useRouter} from "vue-router";

const tokenStore = useTokenStore()
const router = useRouter()
const route = useRoute()

defineOptions({
  name: 'UserLogin'
})

const backUrl = route.query.backUrl
const backParams = route.query.backParams

const data = ref({
  phone: '',
  code: ''
})

const requestLogin = async () => {
  const response = await userSmsLoginApi(data.value)
  if (response.data.code === 200) {
    tokenStore.token = response.data.data
    if (backUrl === undefined || backUrl===null || backUrl==='') {
      await router.push({
        path: "/resource/list"
      })
      return
    }
    await router.push({
      path: backUrl,
      query: {
        resourceId: backParams
      }
    })
  }
}

const requestSmsCode = () => {
  console.log("发送验证码")
}
</script>

<template>
  <div class="banner">
    <pre>
 ___        ______    _______    ______
|"  |      /    " \  |   __ "\  /    " \
||  |     // ____  \ (. |__) :)// ____  \
|:  |    /  /    ) :)|:  ____//  /    ) :)
 \  |___(: (____/ // (|  /   (: (____/ //
( \_|:  \\        / /|__/ \   \        /
 \_______)\"_____/ (_______)   \"_____/

    </pre>
  </div>
  <div class="form-container">
    <van-form @submit="requestLogin">
      <van-cell-group inset>
        <van-field
            v-model="data.phone"
            type="tel"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            maxlength="11"
            colon
            required
            clearable
            :rules="[{ required: true, message: '手机号格式错误' }]"
        />
        <van-field
            v-model="data.code"
            center
            clearable
            label="验证码"
            maxlength="6"
            colon
            required
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '验证码格式错误' }]"
        >
          <template #button>
            <van-button clearable size="small" type="primary" @click="requestSmsCode">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="form-button">
        <van-button round block type="primary" native-type="submit">
          登录/注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="less">
.banner {
  width: 92%;;
  margin: 0 auto;
  pre {
    text-align: center;
  }
}

.form-container {
  width: 92%;
  margin: 0 auto;
  padding: 15px 0;
  border-radius: 10px;
  background-color: #343434;
}

.form-button {
  padding: 15px 15px 0 15px;
}
</style>