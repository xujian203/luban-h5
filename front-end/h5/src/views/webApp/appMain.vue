<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script >
import Vue from 'vue'
export default class AppMain extends Vue { }
</script>

<style lang="scss" scoped>
// .app-main {
//   /* 50= navbar  50  */
//   min-height: calc(100vh - 50px);
//   width: 100%;
//   position: relative;
//   overflow: hidden;
//   background-color: #eeedf0;
// }

// .fixed-header + .app-main {
//   padding-top: 50px;
//   height: 100vh;
//   overflow: auto;
//   background-color: #f1f3fa;
// }
</style>
