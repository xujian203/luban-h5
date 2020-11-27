<template>
  <div style="width: 100%">
    <div style="height:60px;color:#fff;display:flex;justify-content:center;align-items:center">BOE 园区运营管理平台</div>
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <a-menu :default-selected-keys="['1']" :default-open-keys="['sub1']" mode="inline" theme="dark" :inline-collapsed="collapsed">
      <template v-if="menus">
        <a-menu-item :key="index" v-for="(menu,index) in menus" @click="clickMenu(menu)">
          {{menu.title}}
        </a-menu-item>
      </template>
      <template v-else>
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="inbox" />
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="mail" /><span>Navigation One</span>
          </span>
          <a-menu-item key="5">
            Option 5
          </a-menu-item>
          <a-menu-item key="6">
            Option 6
          </a-menu-item>
          <a-menu-item key="7">
            Option 7
          </a-menu-item>
          <a-menu-item key="8">
            Option 8
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="appstore" /><span>Navigation Two</span>
          </span>
          <a-menu-item key="9">
            Option 9
          </a-menu-item>
          <a-menu-item key="10">
            Option 10
          </a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11">
              Option 11
            </a-menu-item>
            <a-menu-item key="12">
              Option 12
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  props: ['menus'],
  data () {
    return {
      collapsed: false
    }
  },
  mounted () {
  },
  methods: {
    clickMenu (clickMenu) {
      this.$emit('menuClick', clickMenu)
    },
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
