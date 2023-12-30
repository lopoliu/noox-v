<script setup>

defineOptions({
  name: "ResourceItem"
})

defineProps({
  resource: {
    type: Object
  }
})

const fullImages = (imgName) => {
  return "http://192.168.0.111/images/" + imgName
}

</script>

<template>
  <div class="resource-item">
    <div class="resource-img">
      <img :src="fullImages(resource.img)" alt="">
    </div>
    <div class="resource-info">
      <h3 class="resource-info-title">{{resource.title}}</h3>
      <div class="resource-info-amount">
        <span>{{resource.downCount}}</span>
        <span>{{resource.price}}</span>
        <span>{{resource.duration}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.resource-item {

  display: flex;
  height: 100px;
  width: 100%;

  .resource-img {
    width: 45%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .resource-info {
    box-sizing: border-box;
    padding: 5px;
    width: 55%;
    color: white;

    .resource-info-title {
      height: 50%;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-align: left;
    }

    .resource-info-amount {
      height: 55%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>