<script setup>
import Navbar from "@/components/Navbar.vue";

</script>

<template>
  <Navbar></Navbar>
  <div>
      <router-view v-slot="{ Component }">
        <keep-alive include="ResourceList">
          <component :is="Component"/>
        </keep-alive>
      </router-view>
  </div>
</template>

<style scoped>

</style>