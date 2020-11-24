import Vue from 'vue'
import message from 'ant-design-vue/lib/message' // 加载 JS
import 'ant-design-vue/lib/message/style/css' // 加载 CSS

import Element from '../components/core/models/element'
import RenderPreview from '../components/core/editor/canvas/preview'
import NodeWrapper from '../components/core/preview/node-wrapper.js'
import axios from 'axios'
import sidebar from '../components/core/editor/masterPage/sidebar.vue'

import { pluginsList } from 'core/plugins/index.js'
Vue.config.productionTip = true
Vue.prototype.$message = message

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
      if (this.currentPage.dataLoadApi) {
        let res = await axios.get(this.currentPage.dataLoadApi)
        this.pageContext = res.data
      }
    },
    renderLongPage () {
      const pageElements = this.currentPage.elements || []
      const height = '100%'
      const elements = pageElements.map(element => new Element(element))
      return <RenderPreview elements={elements} height={height} pageContext={this.pageContext} />
    },
    renderContent (work) {
      const containerStyle = this.getContainerStyle(work)
      return (
        <div id="work-container" data-work-id={work.id} style={containerStyle}>
          {this.renderLongPage(work)}
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
              {this.renderContent(work)}
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
    },
    renderUnPublishTip () {
      return (
        <div style="box-sizing: border-box;min-height: 568px;line-height: 568px;text-align: center;">
          页面可能暂未发布
        </div>
      )
    }
  },
  async mounted () {
    const { data: work } = await axios.get('http://localhost:1337/works/15')
    this.work = work
    this.currentPage = work.pages[0]
    if (this.currentPage.dataLoadApi) {
      let res = await axios.get(this.currentPage.dataLoadApi)
      this.pageContext = res.data
    }
    // this.$forceUpdate()
  },
  render (h) {
    const { work } = this
    console.log(' const', work)
    if (!work) {
      return <div></div>
    }
    // const work = window.__work

    // 预览模式 或者 已经发布 的页面可以正常渲染，否则提示用户暂未发布
    // const query = new URLSearchParams(window.location.search)
    // const canRender = query.get('view_mode') === 'preview' || work.is_publish
    // if (!canRender) return this.renderUnPublishTip()

    return this.renderWithMaster(work)
  }
}
