import Vue from 'vue'
import message from 'ant-design-vue/lib/message' // 加载 JS
import 'ant-design-vue/lib/message/style/css' // 加载 CSS

import Element from '@/components/core/models/element'
import RenderPreview from '@/components/core/editor/canvas/preview'
import NodeWrapper from '@/components/core/preview/node-wrapper.js'
import axios from 'axios'
import sidebar from '@/components/core/editor/masterPage/sidebar.vue'

import { pluginsList } from 'core/plugins/index.js'
Vue.config.productionTip = true
Vue.prototype.$message = message
Vue.prototype.$runtime = true
Vue.prototype.$pageContext = {}
const install = function () {
  pluginsList.forEach(plugin => {
    Vue.component(plugin.name, plugin.component)
  })
}

install()

export default {
  name: 'engine',
  components: { NodeWrapper, sidebar },
  data () {
    return {
      isLongPage: true,
      work: null,
      appContext: null,
      pageContext: {},
      currentPage: null
    }
  },
  methods: {
    async onMenuClick (menu) {
      const page = this.work.pages.find(s => s.uuid === menu.uuid)
      console.log('onMenuClick', page)
      if (page) {
        this.currentPage = page
      }
      this.$router.push({ name: 'dynamic-page', params: { pageId: page.uuid } })

      // if (this.currentPage.dataLoadApi) {
      //   let res = await axios.get(this.currentPage.dataLoadApi)
      //   Vue.prototype.$pageContext = this.pageContext = res.data
      // }
    },
    renderContent (work) {
      const pageElements = this.currentPage.elements || []
      const height = '100%'
      const elements = pageElements.map(element => new Element(element))
      const containerStyle = this.getContainerStyle(work)
      return (
        <div id="work-container" data-work-id={work.id} style={containerStyle}>
          <RenderPreview elements={elements} height={height} pageContext={this.pageContext} />
        </div>)
    },
    renderWithMaster (work) {
      console.log('work', work)
      return (
        <a-layout style={{ height: '100vh' }}>
          <a-layout-sider><sidebar menus={work.pages} on-menuClick={this.onMenuClick}></sidebar></a-layout-sider>
          <a-layout>
            <a-layout-header>表头预览区域</a-layout-header>
            <a-layout-content>
              <transition name="fade-transform" mode="out-in">
                <router-view />
              </transition>
              {/* {this.renderContent(work)} */}
            </a-layout-content>
          </a-layout>
        </a-layout>
      )
    },
    getContainerStyle (work) {
      const containerStyle = {
        position: 'relative',
        height: '100%'
      }
      return containerStyle
    }
  },
  async mounted () {
    console.log('this.$route', this.$route)
    const appId = this.$route.params.id
    const { data: work } = await axios.get(`/works/${appId}`)
    this.work = work
    this.currentPage = work.pages[0]
    if (this.currentPage.dataLoadApi) {
      let res = await axios.get(this.currentPage.dataLoadApi)
      Vue.prototype.$pageContext = this.pageContext = res.data
    }
  },
  render (h) {
    const { work } = this
    console.log(' const', work)
    if (!work) {
      return <div></div>
    }

    return this.renderWithMaster(work)
  }
}
